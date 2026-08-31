const messages = [
  ["Sojib Hasan", "কি করো, খাইছো?"],
  ["Nakib Islam", "কোথায় আছো এখন?"],
  ["Johurul Islam", "অনেক দিন কথা হয় না, কেমন আছো?"],
  ["Rakib Hasan", "ভাই, অনলাইনে আছো?"],
  ["Sabbir Hossain", "আজকে কি প্ল্যান?"],
  ["Mehedi Hasan", "খাওয়া দাওয়া করছো?"],
  ["Shakil Ahmed", "সময় হলে রিপ্লাই দিও।"],
  ["Rifat Hossain", "কালকে দেখা হবে তো?"],
  ["Arif Hasan", "কই তুমি? 😄"],
  ["Nayeem Islam", "ঘুমাইছো নাকি?"]
];

const allowedNumbers = [
  "+8801791241885",
  "+9660556713402"
];

function normalize(number) {
  return String(number || "").replace(/[\s-]/g, "");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const number = normalize(body.number);

    if (!allowedNumbers.includes(number)) {
      return Response.json(
        {
          success: false,
          message: "Number not found"
        },
        { status: 404 }
      );
    }

    const random = [...messages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    return Response.json({
      success: true,
      platform: "Facebook",
      number,
      notifications: random.map(([name, message], index) => ({
        id: `msg_${Date.now()}_${index}`,
        name,
        message,
        timestamp: new Date().toISOString()
      }))
    });

  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid request"
      },
      { status: 400 }
    );
  }
}
