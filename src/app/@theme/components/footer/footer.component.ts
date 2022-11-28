import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by">
  Customized by <b> GRUPO 1 2022</b> <br />
  Created with ♥ by <b><a href="https://akveo.page.link/8V2f" target="_blank">Akveo</a></b> 2019
</span>
<div class="socials">
  MisionTIC 2022 - UNAL - Ciclo 4
</div>
  `,
})
export class FooterComponent {
}
