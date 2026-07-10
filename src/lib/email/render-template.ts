import "server-only";
import { render } from "@react-email/components";
import { createElement } from "react";

export async function renderEmail(
  Component: (props: any) => React.ReactElement,
  props: Record<string, any> = {}
): Promise<string> {
  const element = createElement(Component, props);
  return await render(element);
}
