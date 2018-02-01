
interface JQueryStatic {
  templates(...args: any[]): any;
}

declare namespace OwlCarousel {
  interface Options {
      responsive?: { [breakpoint: string]: Options } | false;
  }
}
