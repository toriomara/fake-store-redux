// Don't use. Now

export async function POST(request) {
  const { email, password } = await request.json();

  if (email === "user@example.com" && password === "password") {
    return Response.json({ token: "fake-jwt-token", username: "john_doe" });
  } else {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }
}
