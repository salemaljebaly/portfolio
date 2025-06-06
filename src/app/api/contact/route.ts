"use server";

import { submitContactForm } from "@/services/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email || !data.message || !data.inquiryType) {
      return NextResponse.json(
        { 
          success: false,
          message: "Please fill in all required fields" 
        },
        { status: 400 }
      );
    }

    const result = await submitContactForm(data);

    if (result.success) {
      return NextResponse.json(
        { 
          success: true,
          message: result.message 
        }, 
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false,
          message: result.message 
        }, 
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "An unexpected error occurred. Please try again later." 
      },
      { status: 500 }
    );
  }
}
