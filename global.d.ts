// global.d.ts or css-module.d.ts
declare module "*.module.css" {
  const classes: { [className: string]: string };
  export = classes;
}
