import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProducts[];
  productSubcription: Subscription;

  basket: IProducts[];
  basketSubcription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  constructor(
    private ProductsService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.canEdit = true;

    this.productSubcription = this.ProductsService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );

    this.basketSubcription =
      this.ProductsService.getProductsFromBasket().subscribe((data) => {
        this.basket = data;
      });
  }

  addToBasket(product: IProducts) {
    product.quantuty = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantuty += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {});
  }

  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() =>
      this.products.find((item) => {
        if (id === item.id) {
          let idx = this.products.findIndex((data) => data.id === id);
          this.products.splice(idx, 1);
        }
      })
    );
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) this.updateData(data);
        else this.postData(data);
      }
    });
  }

  postData(data: IProducts) {
    this.ProductsService.postProduct(data).subscribe((data) =>
      this.products.push(data)
    );
  }

  updateData(product: IProducts) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data;
        else return product;
      });
    });
  }

  ngOnDestroy() {
    if (this.productSubcription) this.productSubcription.unsubscribe();
    if (this.basketSubcription) this.basketSubcription.unsubscribe();
  }
}
