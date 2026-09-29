import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, quantity: 0, status: true };
  id?: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = Number(paramId);
      this.productService.getById(this.id).subscribe(product => (this.product = product));
    }
  }

  save(): void {
    const request = this.id
      ? this.productService.update(this.id, this.product)
      : this.productService.create(this.product);

    request.subscribe(() => this.router.navigate(['/']));
  }
}
