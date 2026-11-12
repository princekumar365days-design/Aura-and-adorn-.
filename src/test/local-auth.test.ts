import { beforeEach, describe, expect, it } from "vitest";
import { currentUser, logIn, logOut, signUp } from "@/lib/local-auth";

describe("browser-only login", () => {
  beforeEach(() => localStorage.clear());

  it("signs up and is logged in right away", async () => {
    expect(await signUp("Sara Khan", "Sara@Mail.com", "secret12")).toBeNull();
    expect(currentUser()).toEqual({ name: "Sara Khan", email: "sara@mail.com" });
  });
  it("rejects a password shorter than 6 characters", async () => {
    expect(await signUp("Sara", "s@mail.com", "123")).toMatch(/6 characters/);
  });
  it("blocks a second account with the same email", async () => {
    await signUp("Sara", "s@mail.com", "secret12");
    expect(await signUp("Other", "S@mail.com", "secret34")).toMatch(/already exists/);
  });
  it("logs in only with the right password", async () => {
    await signUp("Sara", "s@mail.com", "secret12");
    logOut();
    expect(await logIn("s@mail.com", "wrong999")).toMatch(/Wrong/);
    expect(currentUser()).toBeNull();
    expect(await logIn("S@mail.com", "secret12")).toBeNull();
    expect(currentUser()?.name).toBe("Sara");
  });
  it("never stores the raw password", async () => {
    await signUp("Sara", "s@mail.com", "secret12");
    expect(localStorage.getItem("aa-users")).not.toContain("secret12");
  });
});
