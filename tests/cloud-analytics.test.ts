import { describe, expect, it } from "vitest";
import { anonymizeAppUrl } from "@/components/cloud/cloud-analytics";
import { isCloudService } from "@/components/cloud/cloud-service";

describe("app.coldlyne.com analytics", () => {
  it("replaces ids, tokens and dynamic segments, and drops the query string", () => {
    expect(anonymizeAppUrl("https://app.coldlyne.com/")).toBe("https://app.coldlyne.com/");
    expect(anonymizeAppUrl("https://app.coldlyne.com/lists/0b6f3c1e-2f43-4a8e-9a51-0c7d1f2e3a4b?sort=name")).toBe("https://app.coldlyne.com/lists/[id]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/replies/pr_8Yk2?tab=thread#m3")).toBe("https://app.coldlyne.com/replies/[id]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/sequences/abc123")).toBe("https://app.coldlyne.com/sequences/[id]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/connections/gmail")).toBe("https://app.coldlyne.com/connections/[kind]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/u/Zm9vYmFyLXRva2Vu")).toBe("https://app.coldlyne.com/u/[token]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/join/s3cr3t-invite")).toBe("https://app.coldlyne.com/join/[token]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/workspace/w_42")).toBe("https://app.coldlyne.com/workspace/[workspace]");
    expect(anonymizeAppUrl("https://app.coldlyne.com/reset-password?token=secret")).toBe("https://app.coldlyne.com/reset-password");
    expect(anonymizeAppUrl("https://app.coldlyne.com/today")).toBe("https://app.coldlyne.com/today");
    expect(anonymizeAppUrl("https://app.coldlyne.com/lists/0b6f/acme-corp")).toBe("https://app.coldlyne.com/lists/[id]/[id]");
  });

  it("runs only on the hosted service, never on a copy or a self-hosted instance", () => {
    expect(isCloudService({ VERCEL_GIT_REPO_OWNER: "Coldlyne", VERCEL_GIT_REPO_SLUG: "coldlyne-cloud" })).toBe(true);
    expect(isCloudService({ VERCEL_GIT_REPO_OWNER: "FAKGR0UP", VERCEL_GIT_REPO_SLUG: "coldlyne-instance" })).toBe(false);
    expect(isCloudService({})).toBe(false);
  });
});
