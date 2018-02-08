
interface JQueryStatic {
  templates(...args: any[]): any;
}

declare namespace OwlCarousel {
  interface Options {
      responsive?: { [breakpoint: string]: Options } | false;
  }
}

interface JSON {
  _load(...args: any[]): Promise<any>;
  _save(...args: any[]): Promise<any>;
  _classes(...args: any[]): void;
  _stringify(...args: any[]): string;
  _parse(...args: any[]): any;
}
