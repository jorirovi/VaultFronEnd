import { Component, inject } from '@angular/core';
import { VaultService } from '../../Service/vault.service';
import { vault } from '../../Models/vault.model';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.css'
})
export class VaultComponent {
  private _vaultService = inject(VaultService);
  joyasEntity: vault[] = [];
  joyaEntity: vault = {id:'', tituloV:'', urlV:'', usuarioV:'', passV:''};
  mostrar: boolean = false;
  crearJoyaM: boolean = false;
  modificarJoya: boolean = false;
  frmJoya!: FormGroup;
  contrasenaJ: string = '';

  ngOnInit(){
    this.Cargar_Joyas();
  }

  buildFormJoyaN(){
    this.frmJoya = new FormGroup({
      tituloV: new FormControl ('',[Validators.required]),
      urlV: new FormControl ('',[Validators.required]),
      usuarioV: new FormControl ('',[Validators.required]),
      passV: new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  }

  buildFormJoyaM(){
    this.frmJoya = new FormGroup({
      tituloV: new FormControl ('',[Validators.required]),
      urlV: new FormControl ('',[Validators.required]),
      usuarioV: new FormControl ('',[Validators.required]),
      passV: new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  }

  Cargar_Joyas(){
    this._vaultService.getJoyas().subscribe ({
      next: (response) => {
        this.joyasEntity = response
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }

  generarContrasena(): string {
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const especiales = "$%&.-_/";

    const caracteresDisponibles = mayusculas + minusculas + numeros + especiales;
    let contrasena = "";

    // Aseguramos al menos un carácter de cada tipo
    contrasena += mayusculas.charAt(Math.floor(Math.random() * mayusculas.length));
    contrasena += minusculas.charAt(Math.floor(Math.random() * minusculas.length));
    contrasena += numeros.charAt(Math.floor(Math.random() * numeros.length));
    contrasena += especiales.charAt(Math.floor(Math.random() * especiales.length));

    // Llenamos el resto de la contraseña hasta llegar a 10 caracteres
    for (let i = contrasena.length; i < 10; i++) {
        contrasena += caracteresDisponibles.charAt(Math.floor(Math.random() * caracteresDisponibles.length));
    }

    // Desordenar la contraseña para que los primeros 4 caracteres no siempre sigan el patrón
    contrasena = this.mezclarCaracteres(contrasena);

    return contrasena;
  }

  // Función auxiliar para mezclar los caracteres de una cadena
  mezclarCaracteres(texto: string): string {
    return texto.split('').sort(() => Math.random() - 0.5).join('');
  }

  generaContrasenaJ(){
    this.contrasenaJ = this.generarContrasena();
  }

  OnVerJoya(id: string){
    this.mostrar = !this.mostrar
    this._vaultService.getJoya(id).subscribe({
      next: (response) => {
        this.joyaEntity = response;
      },
      error: (error) => {
        alert(error.message)
      }
    })
  }

  onCerrar(){
    this.mostrar = !this.mostrar
  }

  onMostrarFrmJoya(){
    this.crearJoyaM = !this.crearJoyaM;
    this.contrasenaJ = '';
    this.buildFormJoyaN();
  }

  onSubmitJoya(event: Event){
    event.preventDefault();
    if(this.frmJoya.valid){
      this.joyaEntity = this.frmJoya.value;
      this._vaultService.AddJoya(this.joyaEntity).subscribe({
        next: (response) => {
          alert(`Se crea la Joya: ${response.tituloV}`)
          this.crearJoyaM = !this.crearJoyaM;
          this.Cargar_Joyas();
        },
        error: (error) => {
          alert(error)
        }
      });
    }
  }

  onDeleteJoya(id: string){
    this._vaultService.DeleteJoya(id).subscribe({
      next: (response) => {
        alert(`El Registro ${response.registro} fue Eliminado`);
        //this.ngOnInit()
        this.Cargar_Joyas();
      },
      error: (error) => {
        alert(error.message)
      }
    });
  }

  onOpenJoyaUpdate(id: string){
    this.modificarJoya = !this.modificarJoya;
    this.contrasenaJ = '';
    this.buildFormJoyaM();
    this._vaultService.getJoya(id).subscribe({
      next: (response) => {
        this.joyaEntity = response;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  onUpdateJoya(form: any){
    if(form.valid){
      this._vaultService.UpdateJoya(form.value).subscribe({
        next: (response) => {
          alert(`Se Modifico el registro ${response.tituloV}`);
          this.onCerrarJoyaUpdate();
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }
  }

  onCerrarJoyaUpdate(){
    this.modificarJoya = !this.modificarJoya;
  }
}
