const jwt = require('jsonwebtoken');
const { createToken } = require('../helpers/tokens');
const { SECRET_KEY } = require('../config');

describe("createToken function", function () {
    test("works: not admin", function () {
        const token = createToken({ username: "regularuser", isAdmin: false });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "regularuser",
            isAdmin: false
        });
    });
    test("works: admin", function () {
        const token = createToken({ username: "adminuser", isAdmin: true });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "adminuser",
            isAdmin: true
        });
    });
    test("works: default no admin", function () {
        const token = createToken({ username: "test" });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });
});