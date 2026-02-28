export const testData = {
  base64: {
    valid: {
      simple: { input: 'Hello World', encoded: 'SGVsbG8gV29ybGQ=' },
      unicode: { input: '你好世界', encoded: '5L2g5aW95LiW55WM' },
      special: { input: '!@#$%^&*()', encoded: 'IUAjJCVeJiooKQ==' },
      multiline: { input: 'Line 1\nLine 2\nLine 3', encoded: 'TGluZSAxCkxpbmUgMgpMaW5lIDM=' },
      empty: { input: '', encoded: '' },
      long: { input: 'a'.repeat(1000), encoded: null },
    },
    invalid: {
      notBase64: 'This is not base64!!!',
      malformed: 'SGVsbG8gV29ybGQ',
    }
  },

  jwt: {
    valid: {
      hs256: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      withExpiry: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxOTE2MjM5MDIyfQ.4Adcj0MLP-kJJyB7zBuUsY8EwHNjwKCxKR_qY_n0R7c',
      expired: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNTE2MjM5MDIyfQ.4Adcj0MLP-kJJyB7zBuUsY8EwHNjwKCxKR_qY_n0R7c',
    },
    invalid: {
      malformed: 'not.a.jwt',
      twoSegments: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0',
      empty: '',
    }
  },

  json: {
    valid: {
      simple: '{"name":"John","age":30}',
      nested: '{"user":{"name":"John","address":{"city":"NYC"}}}',
      array: '[1,2,3,4,5]',
      mixed: '{"users":[{"name":"John"},{"name":"Jane"}],"count":2}',
      minified: '{"a":1,"b":2,"c":3}',
      formatted: '{\n  "name": "John",\n  "age": 30\n}',
    },
    invalid: {
      missingQuote: '{"name":"John}',
      trailingComma: '{"name":"John",}',
      singleQuotes: "{'name':'John'}",
      empty: '',
    }
  },

  url: {
    valid: {
      simple: 'hello world',
      special: 'hello@world.com?test=value',
      unicode: '你好世界',
      encoded: 'hello%20world',
      query: 'name=John Doe&email=john@example.com',
    }
  },

  hash: {
    inputs: {
      simple: 'hello world',
      unicode: '你好世界',
      empty: '',
      long: 'a'.repeat(10000),
      special: '!@#$%^&*()',
    },
    expected: {
      md5Simple: '5eb63bbbe01eeed093cb22bb8f5acdc3',
      sha256Simple: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    }
  },

  timestamp: {
    valid: {
      unixSeconds: '1234567890',
      unixMilliseconds: '1234567890000',
      iso8601: '2009-02-13T23:31:30.000Z',
      readable: 'February 13, 2009',
    },
    current: Date.now(),
  },

  uuid: {
    valid: '550e8400-e29b-41d4-a716-446655440000',
    pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  },

  password: {
    requirements: {
      minLength: 8,
      maxLength: 64,
    },
    patterns: {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      numbers: /[0-9]/,
      symbols: /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/,
    }
  },

  regex: {
    patterns: {
      email: {
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        flags: 'g',
        validMatch: 'test@example.com',
        invalidMatch: 'not-an-email',
      },
      phone: {
        pattern: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
        flags: 'g',
        validMatch: '(555) 123-4567',
        invalidMatch: '123',
      },
      url: {
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        flags: 'g',
        validMatch: 'https://example.com',
        invalidMatch: 'not a url',
      }
    }
  },

  diff: {
    scenarios: {
      noChanges: {
        text1: 'Hello World',
        text2: 'Hello World',
      },
      additions: {
        text1: 'Hello',
        text2: 'Hello World',
      },
      deletions: {
        text1: 'Hello World',
        text2: 'Hello',
      },
      modifications: {
        text1: 'Hello World',
        text2: 'Hello Universe',
      },
      multiline: {
        text1: 'Line 1\nLine 2\nLine 3',
        text2: 'Line 1\nLine 2 Modified\nLine 3\nLine 4',
      }
    }
  }
}
