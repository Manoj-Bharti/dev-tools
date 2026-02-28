#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const net = require('net')
const { URL } = require('url')

const CONFIG_PATH = path.resolve(process.cwd(), 'mcp.config.json')

function timeout(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

async function checkTcp(host, port, ms = 1500) {
  return new Promise((resolve) => {
    const start = Date.now()
    const sock = new net.Socket()
    let done = false
    sock.setTimeout(ms)
    sock.on('connect', () => {
      const t = Date.now() - start
      done = true
      sock.destroy()
      resolve({ ok: true, time: t })
    })
    sock.on('error', (err) => {
      if (done) return
      done = true
      resolve({ ok: false, error: String(err) })
    })
    sock.on('timeout', () => {
      if (done) return
      done = true
      sock.destroy()
      resolve({ ok: false, error: 'timeout' })
    })
    sock.connect(port, host)
  })
}

async function checkHttp(urlString, ms = 2000) {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), ms)
    const start = Date.now()
    const res = await fetch(urlString, { method: 'GET', signal: controller.signal })
    clearTimeout(id)
    const time = Date.now() - start
    return { ok: res.ok, status: res.status, time }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

async function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('No mcp.config.json found at', CONFIG_PATH)
    process.exit(2)
  }

  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
  const servers = cfg.servers || []

  const results = []
  for (const s of servers) {
    const id = s.id || s.name
    const host = s.host || '127.0.0.1'
    const port = s.port
    const protocol = (s.protocol || 'http').toLowerCase()
    const health = s.healthPath

    let res
    if (protocol === 'http' && health && port) {
      const url = `${protocol}://${host}:${port}${health}`
      res = await checkHttp(url)
      results.push({ id, url, ...res })
    } else if (port) {
      res = await checkTcp(host, port)
      results.push({ id, host, port, ...res })
    } else {
      results.push({ id, error: 'no-port-or-health' })
    }
    // small pause to avoid spamming
    await timeout(120)
  }

  // Print summary
  console.log('MCP Servers:')
  for (const r of results) {
    if (r.ok) {
      if (r.url) console.log(`- ${r.id}: UP (${r.url}) - ${r.time}ms`)
      else console.log(`- ${r.id}: UP (${r.host}:${r.port}) - ${r.time}ms`)
    } else {
      if (r.url) console.log(`- ${r.id}: DOWN (${r.url}) - ${r.error || r.status}`)
      else console.log(`- ${r.id}: DOWN (${r.host || ''}${r.port ? ':' + r.port : ''}) - ${r.error || 'unknown'}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
