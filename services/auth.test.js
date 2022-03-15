import { createToken, verifyToken, getTokenInfo } from '../services/auth.js';

describe('Testing auth module', () => {
  const mockedUser = {
    email: 'paco@paco.es',
    id: 1,
  };

  test('Testing Creatoken function', () => {
    const token = createToken(mockedUser);

    expect(token).toBeTruthy();
  });

  test('Testing verifyToken function', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhY29AcGFjby5lcyIsImlhdCI6MTY0NzI3NjI1NX0.X16AUbnkJI7ZLhiwmvsCEMfyUy9FcxHPKAG52D_kCTA';
    const decodedToken = verifyToken(token);

    expect(decodedToken.email).toBe('paco@paco.es');
  });

  test('Testing verifyToken function with no valid token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.X16AUbnkJI7ZLhiwmvsCEMfyUy9FcxHPKAG52D_kCTA';
    const decodedToken = verifyToken(token);

    expect(decodedToken.email).toBe(undefined);
  });

  test('Testing getTokenInfo function', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhY29AcGFjby5lcyIsImlhdCI6MTY0NzI3NjI1NX0.X16AUbnkJI7ZLhiwmvsCEMfyUy9FcxHPKAG52D_kCTA';
    const result = getTokenInfo(token);

    expect(result.email).toBe('paco@paco.es');
  });
});
