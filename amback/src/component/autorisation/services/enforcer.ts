import * as casbin from 'casbin';
import path from 'path';

export async function createEnforcer() {
  const conf = path.resolve(__dirname, '../../../../fixtures/policy/rbac_model.conf');
  const policy = path.resolve(
    __dirname,
    '../../../../fixtures/policy/rbac_policy.csv',
  );
  return casbin.newEnforcer(conf, policy);
}
