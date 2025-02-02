// imports and applies the jest extensions
import "tsarch/dist/jest";

// imports the files entrypoint
import { filesOfProject } from "tsarch";

describe("依存関係", () => {
  // architecture tests can take a while to finish
  jest.setTimeout(60000);

  // we use async await in combination with jest since this project uses asynchronous calls
  it("domainパッケージがinfrastractureパッケージに依存していないこと", async () => {
    const rule = filesOfProject()
      .inFolder("domain")
      .shouldNot()
      .dependOnFiles()
      .inFolder("infrastracture");

    await expect(rule).toPassAsync();
  });

  it("usecaseパッケージがinfrastractureパッケージに依存していないこと", async () => {
    const rule = filesOfProject()
      .inFolder("usecase")
      .shouldNot()
      .dependOnFiles()
      .inFolder("infrastracture");

    await expect(rule).toPassAsync();
  });
  it("usecaseパッケージがpresentationパッケージに依存していないこと", async () => {
    const rule = filesOfProject()
      .inFolder("usecase")
      .shouldNot()
      .dependOnFiles()
      .inFolder("presentation");

    await expect(rule).toPassAsync();
  });
});
