import { UserModule } from "~/types";

import ElementPlus from "element-plus";

export const install: UserModule = ({ app }) => {
  app.use(ElementPlus);
};
