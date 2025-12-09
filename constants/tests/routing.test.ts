import { appRoutingMock } from "@/mocks/routing";

describe("Route Configuration", () => {
  it("builds static paths correctly", () => {
    expect(appRoutingMock.DASHBOARD.build()).toBe("/dashboard");
    expect(appRoutingMock.LOGIN.build()).toBe("/login");
  });

  it("builds dynamic paths correctly", () => {
    // Assuming USER_DETAILS is /users/[id]
    const path = appRoutingMock.USER_DETAILS.build({ params: { id: 123 } });
    expect(path).toBe("/users/123");
  });

  it("builds complex paths with query params correctly", () => {
    // Assuming INVOICE_EDIT builder handles params
    // Adjust strictly based on your actual build function signature
    const path = appRoutingMock.INVOICE_EDIT.build({
      params: { invoiceId: "inv_123", version: 5 },
    });
    expect(path).toContain("/invoices/inv_123/versions/5");
  });

  it("ensures all private routes have private: true", () => {
    const privateRoutes = Object.values(appRoutingMock).filter((r) =>
      r.path.includes("dashboard")
    );
    privateRoutes.forEach((route) => {
      expect(route.isPrivate).toBe(true);
    });
  });
});
