export const INPUT_INVALID = {
  type: 'INPUT_INVALID',
  severity: 'error',
  message: 'invalid invalid',
}

export const INPUT_INSUFFICIENT = {
  type: 'INPUT_INSUFFICIENT',
  severity: 'error',
  message: 'insufficient input',
}

export const INPUT_MISMATCHES_PATTERN = {
  type: 'INPUT_MISMATCHES_PATTERN',
  severity: 'error',
  message: 'input mismatches pattern in config',
}

export const ENTRY_MALFORMED = (payload) => ({
  type: 'ENTRY_MALFORMED',
  severity: 'warning',
  message: `malformed entry at line ${payload?.line}`,
})

export const POST_RECORD_FAILED = (payload) => ({
  type: 'ERROR',
  severity: 'error',
  message: 'record postprocessor failed',
  payload,
})

export const ERROR = (payload) => ({
  type: 'ERROR',
  severity: 'error',
  message: 'an error occured',
  payload,
})
