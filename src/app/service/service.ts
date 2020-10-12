
export class Service {
  private i = 0;
  public test() {
    console.log('service');
    console.log(this.i)
    this.i++;
  }

  public test2(): void {
    console.log('serdupa', this.i);
  }
}