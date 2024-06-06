import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router, public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }


  searchProducts() {
    this.appState.setProductState({
      status: "LOADING"
    })
    this.productService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize).subscribe({
        next: (resp) => {
          let products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get('X-Total-Count')!);

          console.log(totalProducts);

          if (!isNaN(totalProducts)) {
            let totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);
            if (totalProducts % this.appState.productsState.pageSize !== 0) {
              ++totalPages;
            }

            this.appState.setProductState({
              products: products,
              totalProducts: totalProducts,
              totalPages: totalPages,
              status: "LOADED"
            })
          } else {
            console.error('Erreur lors de la récupération du nombre total de produits.');
            this.appState.setProductState({
              status: "ERROR"
            })
          }
        }, error: err => {
          this.appState.setProductState({
            status: "ERROR",
            errorMessage: err
          })
        }
      });
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updateProduct => {
        product.checked = !product.checked;
        // this.getProducts();
      }
    })
  }

  handleDelete(product: Product) {
    if (confirm("Etes vous sûre?"))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          // this.getProducts();
          // this.appState.productsState.products = this.appState.productsState.products.filter((p: any) => p.id != product.id);

          this.searchProducts();
        }
      })
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }

  handleGotoPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }
}
