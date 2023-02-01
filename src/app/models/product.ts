export interface IProducts {
  id: number;
  title: string;
  price: string;
  color: string;
  image?: string;
  memory: string;
  configure: IProductsConfig;
  quantuty: number;
}

export interface IProductsConfig {
  processor: string;
  display: string;
  camera: string;
}
