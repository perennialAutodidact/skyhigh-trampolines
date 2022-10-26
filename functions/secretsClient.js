
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const secrets = new SecretManagerServiceClient();

exports.getSecretValue = async (name) => {
  const [version] = await secrets.accessSecretVersion({
    name: `projects/skyhigh-trampolines/secrets/${name}/versions/latest`,
  });

  const payload = version.payload?.data?.toString();
  return payload;
};