const baseUrl = 'http://localhost:3000/api/v1';

async function testSecurity() {
    console.log("Starting Security Verification...");

    const randomSuffix = Math.floor(Math.random() * 10000);
    const validUser = {
        firstName: "Test",
        lastName: "User",
        email: `security_test_${randomSuffix}@example.com`,
        password: "securepassword123"
    };
    const shortPasswordUser = {
        firstName: "Short",
        lastName: "Pass",
        email: `short_pass_${randomSuffix}@example.com`,
        password: "123"
    };

    // 1. Test Short Password Signup (Should fail)
    console.log("\n1. Testing Short Password Signup...");
    try {
        const res = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shortPasswordUser)
        });
        if (res.status === 400 || res.status === 411) { // 411 is what zode returns on error in this codebase? Or 400? Checked code: 400 "Invalid inputs"
            // Wait, zod safeParse failure returns 400 in signUpValidator.
            console.log("✅ Passed: Short password rejected with status " + res.status);
        } else {
            console.error("❌ Failed: Short password accepted with status " + res.status);
        }
    } catch (e) {
        console.error("❌ Failed: Exception during short password test", e);
    }

    // 2. Test Valid Signup
    console.log("\n2. Testing Valid Signup...");
    let token = null;
    try {
        const res = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validUser)
        });
        if (res.status === 201) {
            const data = await res.json();
            token = data.token;
            console.log("✅ Passed: Valid user signup successful");
        } else {
            const text = await res.text();
            console.error(`❌ Failed: Valid user signup failed with status ${res.status}: ${text}`);
            return; // Stop if signup fails
        }
    } catch (e) {
        console.error("❌ Failed: Exception during valid signup", e);
        return;
    }

    // 3. Test Signin with Wrong Password
    console.log("\n3. Testing Signin with Wrong Password...");
    try {
        const res = await fetch(`${baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: validUser.email, password: "wrongpassword" })
        });
        if (res.status === 401 || res.status === 411) { // Code returns 411 on failure
            console.log("✅ Passed: Wrong password rejected with status " + res.status);
        } else {
            console.error("❌ Failed: Wrong password accepted with status " + res.status);
        }
    } catch (e) {
        console.error("❌ Failed: Exception during wrong password signin", e);
    }

    // 4. Test Signin with Correct Password
    console.log("\n4. Testing Signin with Correct Password...");
    try {
        const res = await fetch(`${baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: validUser.email, password: validUser.password })
        });
        if (res.status === 200) {
            console.log("✅ Passed: Correct password signin successful");
        } else {
            const text = await res.text();
            console.error(`❌ Failed: Correct password signin failed with status ${res.status}: ${text}`);
        }
    } catch (e) {
        console.error("❌ Failed: Exception during correct password signin", e);
    }

    // 5. Test Transfer with Invalid Token (Should fail)
    console.log("\n5. Testing Transfer with Invalid Token...");
    try {
        const res = await fetch(`${baseUrl}/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer invalidtoken'
            },
            body: JSON.stringify({ toAccountId: "someid", amount: 100 })
        });
        if (res.status === 401 || res.status === 402 || res.status === 403) {
            console.log("✅ Passed: Invalid token rejected with status " + res.status);
        } else {
            console.error("❌ Failed: Invalid token accepted with status " + res.status);
        }
    } catch (e) {
        console.error("❌ Failed: Exception during invalid token transfer", e);
    }

}

testSecurity();
