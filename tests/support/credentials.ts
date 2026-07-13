export interface Credentials {
  username: string;
  password: string;
}

function getCredential(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export function getValidCredentials(): Credentials {
  return {
    username: getCredential("VALID_USER_NAME", "standard_user"),
    password: getCredential("VALID_USER_PASSWORD", "secret_sauce"),
  };
}

export function getInvalidCredentials(): Credentials {
  return {
    username: getCredential("INVALID_USER_NAME", "invalid_user"),
    password: getCredential("INVALID_USER_PASSWORD", "invalid_password"),
  };
}
