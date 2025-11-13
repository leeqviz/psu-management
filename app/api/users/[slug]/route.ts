import { userDataMock } from "@/mocks/user";

export async function GET() {
  return Response.json(userDataMock);
}
