import { DatePipe } from "@angular/common";
import { AbstractControl, FormGroup, Validators } from "@angular/forms";

export class Utils{

  public static soloTextoPattern = { N: { pattern: new RegExp('\[a-zñA-ZÑ\]')} };
  public static rfcPattern: any = '^([A-ZÑ\\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\\d]{3})?$';
  public static emailPattern: any = '^[_A-ZÑa-zñ0-9-\\+]+(\\.[_A-ZÑa-zñ0-9-]+)*@[A-ZÑa-zñ0-9-]+(\\.[A-ZÑa-zñ0-9]+)*(\\.[A-ZÑa-zñ]{2,})$';


  public static scrollTo(id_elemento: string){
    const element = document.querySelector(`#${id_elemento}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'end'});
  }

  public static descomponerClabeInterbancaria(clabe: string): any{
    if(clabe && clabe.length === 18){
      const banco = clabe.substring(0,3);
      const plaza = clabe.substring(3,6);
      const cuenta = clabe.substring(6,17);
      const dc = clabe.substring(17,18);

      return {
        banco,
        plaza,
        cuenta,
        dc
      }
    }

    return null;
  }

  public static bancosValidos(): Array<string>{
    return ['166'];
  }

  public static cadenaAFecha(fechaMX: string): Date{
    const parts = fechaMX.split('/');
    const fecha = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    console.log('mi fecha', fecha.toDateString());
    return fecha;
  }

  public static cadenaAFechaSeparador(fechaMX: string, caracterSeparador: string): Date{
    const parts = fechaMX.split(caracterSeparador);
    const fecha = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    console.log('mi fecha', fecha.toDateString());
    return fecha;
  }

  public static existeCurpEn(curp:string, items:Array<any>): boolean{
    const elemento = items.find(item => item.curp === curp);
    if(elemento === undefined){
      return false;
    }
    return true;
  }

  public static fechaACadena(date: Date, datepipe: DatePipe): string {
    let myDate = date;
      return datepipe?.transform(myDate, 'dd/MM/yyyy') || "";
  }

  public static verificarFormatoCurp(curp:string): boolean{
    const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    const validado = curp.match(re);
    return validado ? true : false;
  }

  public static verificarFormatoEmail(email:string): boolean{
    const validado = email.match(this.emailPattern);
    return validado ? true : false;
  }

  public static caracteresEmail(event: any){
    console.log(event)
    var regex = new RegExp("[a-zA-Z0-9._@]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
        return true;
    }

    event.preventDefault();
    return false;
  }

  public static esCampoNoValido(campo: AbstractControl, isSubmited: boolean): boolean{
    if(campo){
      return (campo.errors ? true : false ) &&
                (campo.dirty || campo.touched || isSubmited);
    }
    return false;
  }

  public static sumaProperty(arreglo: Array<any>, property: string): number{
    if(arreglo){
      return arreglo
    .map(item => item[property])
    .reduce((prev, curr) => prev + curr, 0);
    }
    return 0;
  }
}
