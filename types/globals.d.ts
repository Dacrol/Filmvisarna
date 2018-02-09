
interface JQueryStatic {
  templates(...args: any[]): any;
}

declare namespace OwlCarousel {
  interface Options {
      responsive?: { [breakpoint: string]: Options } | false;
  }
}

interface JSON {
  _load(filename: string, ...args: any[]): Promise<any>;
  _save(filename: string, data: any, ...args: any[]): Promise<any>;
  _classes(...args: any[]): void;
  _stringify(...args: any[]): string;
  _parse(...args: any[]): any;
}
