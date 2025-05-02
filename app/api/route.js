const { NextResponse } = require("next/server");

export async function GET(req) {
  return NextResponse.json({ time: new Date().toLocaleString() });
}

export default GET;
