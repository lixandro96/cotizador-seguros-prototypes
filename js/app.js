// varaibles
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#cotizar-seguro');

// crea los prototypes
function Seguro(marca,year,tipo){
  this.marca = marca,
  this.year = year,
  this.tipo = tipo
}
// realiza la cotizacio del seguro
Seguro.prototype.cotizarSeguro = function (){

  // '1' Americano 1.15
  // '2' Asiatico 1.05
  // '3' Europeo 1.5

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15
      break;
    case '2':
      cantidad = base * 1.05
      break;
    case '3':
      cantidad = base * 1.35
      break;
  
    default:
      break; 
    }
  // leer el año
  const diferencia= new Date().getFullYear() - this.year;

  // cada año que le diferencia es mayor, el costo se reduce un 3%
  cantidad -= ((diferencia*3)*cantidad)/100;
  /*
    si el seguro es basico, e aumenta un 30%
    si el seguro es completo, e aumenta un 50%
  */
 if(this.tipo === 'basico'){
  cantidad += 1.30;
 }else{
  cantidad += 1.50;
 }
  return cantidad

}
function UI(){}// crea la interfas

// llena las opciones
UI.prototype.llenarOpciones = () =>{
  
  const selectYear = document.querySelector('#year');
  const max = new Date().getFullYear();
  const min = max - 20;
  
  for(let i = max; i > min; i--){
    const option = document.createElement('OPTION');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option)
  }
}
UI.prototype.mostrarResultado = (total,seguro) =>{

  const {marca,year,tipo} = seguro
  let nombreMarca;

  switch (marca) {
    case '1':
      nombreMarca = 'Americano'
      break;
    case '2':
      nombreMarca = 'Asiatico'
      break;
    case '3':
      nombreMarca = 'Europeo'
      break;
  
    default:
      break;
  }
  const divResultado = document.createElement('DIV');
  divResultado.classList.add('mt-10');

  const ph = document.createElement('p');
  ph.classList.add('header');
  ph.textContent = "Tu Resumen"
  
  const pm = document.createElement('p');
  pm.classList.add('font-bold');
  pm.textContent = 'Marca: '

  const spm = document.createElement('span');
  spm.classList.add('font-normal');
  spm.textContent = nombreMarca
  pm.appendChild(spm)

  const py = document.createElement('p');
  py.classList.add('font-bold');
  py.textContent = 'Año: '

  const spy = document.createElement('span');
  spy.classList.add('font-normal');
  spy.textContent = year
  py.appendChild(spy)

  const ptipo = document.createElement('p');
  ptipo.classList.add('font-bold');
  ptipo.textContent = 'Tipo: '

  const sptipo = document.createElement('span');
  sptipo.classList.add('font-normal','capitalize');
  sptipo.textContent = tipo
  ptipo.appendChild(sptipo)

  const ptotal = document.createElement('p');
  ptotal.classList.add('font-bold');
  ptotal.textContent = 'Total: '

  const sptotal = document.createElement('span');
  sptotal.classList.add('font-normal');
  sptotal.textContent = total
  ptotal.appendChild(sptotal)
  
  divResultado.appendChild(ph)
  divResultado.appendChild(pm)
  divResultado.appendChild(py)
  divResultado.appendChild(ptipo)
  divResultado.appendChild(ptotal)

  const spinner = document.querySelector('#cargando');
  spinner.classList.remove('hidden');

  setTimeout(() => {
    spinner.classList.add('hidden');
    resultado.appendChild(divResultado)

  }, 3000);
}
UI.prototype.mostrarMensaje = (mensaje,tipo)=>{

  const div = document.createElement('div');
  div.textContent= mensaje;
  div.classList.add('mt-10','mensaje')
  if(tipo === 'error'){
    div.classList.add('error')
  }else{
    div.classList.add('correcto')
  }

  const alerta = document.querySelector('.mensaje');

  if(!alerta){
    formulario.insertBefore(div,resultado)
  }
  setTimeout(() => {
    div.remove();
  }, 3000);
}
// instanciar el prototype
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  ui.llenarOpciones() // LLENA LAS OPCIONES DEL AñO
})

//EVENTlISTENERS
eventListeners()
function eventListeners(){
  formulario.addEventListener('submit', validarCotizar)
} 

// funcion que cotiza el seguro
function validarCotizar(e){
  e.preventDefault()
  // lee la marca seleccionada
  const marca = document.querySelector('#marca').value;

  // lee el año seleccionada
  const year = document.querySelector('#year').value;

  // lee la marca seleccionada
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if(marca === '' || year === '' || tipo === ''){
    ui.mostrarMensaje('Faltan datos, revisa el formulario e intenta de nuevo','error')
    return
  }
  ui.mostrarMensaje('Cotizando...','correcto')

  // oculta las cotizaciones previas
  const resultadoCotizacion = document.querySelector('#resultado div');

  if(resultadoCotizacion !== null){
    resultadoCotizacion.remove()
  }
  // instancia de seguro
  const seguro = new Seguro(marca,year,tipo)
  const total = seguro.cotizarSeguro()
  ui.mostrarResultado(total,seguro)
   
}
