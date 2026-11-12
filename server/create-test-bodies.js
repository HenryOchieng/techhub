import fs from "node:fs"

const smallBody = {
    name: "Postman Size Test",
    email: "postman-size-test@example.com",
    password: "StrongPassword123!"
}

const largeBody = {
    name: "Postman Large Body Test",
    email: "postman-large-test@example.com",
    password: "StrongPassword123!",
    extraData: "A".repeat(12000)
}

fs.writeFileSync(
    "small-request.json",
    JSON.stringify(smallBody, null, 2)
)

fs.writeFileSync(
    "large-request.json",
    JSON.stringify(largeBody, null, 2)
)

console.log(
    "Small JSON:",
    Buffer.byteLength(JSON.stringify(smallBody, null, 2)),
    "bytes"
)

console.log(
    "Large JSON:",
    Buffer.byteLength(JSON.stringify(largeBody, null, 2)),
    "bytes"
)