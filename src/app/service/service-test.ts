import { Injectable } from "../../core/decorator/injection/injection";

export class ServiceTest {
  private i = 0;
  public test() {
    console.log('service test');
    console.log(this.i)
    this.i++;
  }

  public test2(): void {
    console.log('serdupa dddddsds', this.i);
  }
}