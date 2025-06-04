"use server";

import { submitContactForm } from "@/services/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await submitContactForm(data);

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
