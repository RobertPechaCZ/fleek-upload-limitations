import { FleekSdk, PersonalAccessTokenService } from "@fleekxyz/sdk";
import { join } from "path";

const testFileUpload = async () => {
  const accessTokenService = new PersonalAccessTokenService({
    graphqlServiceApiUrl: "https://graphql.service.fleeksandbox.xyz/graphql",
    personalAccessToken: "<token>",
    projectId: "clv4wd0b20000l108912lwobf",
  });
  const sdk = new FleekSdk({
    graphqlServiceApiUrl: "https://graphql.service.fleeksandbox.xyz/graphql",
    uploadProxyApiUrl: "https://uploads.service.fleeksandbox.xyz/",
    accessTokenService,
  });

  console.log("Upload started");

  const pin = await sdk.storage().uploadDirectory({
    path: join(process.cwd(), "files"),
    onUploadProgress: console.log,
  });

  console.log("Upload done", pin);

  accessTokenService.close();
};

testFileUpload().catch(console.error);
