window.onload = function () {
  sviproizvodi();
  $.ajax({
    url: "json/proizvodi.json",
    dataType: "json",          
    success: function (proizvod) {
      ispisProizvoda(proizvod);
    }

  });
  $.ajax({
    url: "json/meni.json",       
    dataType: "json",
    success: function (data) {
      meni(data);
      ispisiMeni(data);
      ispisCheck(data);
    }

  });
document.getElementById("search").addEventListener("keyup",search);   
document.getElementById("prvia").addEventListener("click", cetiri);
document.getElementById("drugia").addEventListener("click", sest);
document.getElementById("trecia").addEventListener("click", dva);
document.getElementById("lista").addEventListener("change", lista);
document.getElementById("dugme").addEventListener("click", provera)
$('#11').click(function(e){e.preventDefault()})
localStorage.removeItem('zene2')
localStorage.removeItem('zene')
  localStorage.removeItem('cena')
  localStorage.removeItem('klik')
  localStorage.removeItem('value')
  localStorage.removeItem('sacuvano')
}
function sviproizvodi() {
  $.ajax({
    url: "json/proizvodi.json",
    dataType: "json", 
    async:false,          //AJAX ZA PROIZVODE
    success: function (proizvod) {
 localStorage.setItem('proizvodi', JSON.stringify(proizvod))}})
}
function meni(data) {
  localStorage.setItem('meni', JSON.stringify(data))
}
function otvori(e){
  e.preventDefault();
  $("#exampleModalCenter").css("display", "block")
  $('.zatvori').click(function() {
    $("#exampleModalCenter").css("display", "none")
  })
  $('.dalje').click(function () {
    $("#exampleModalCenter").css("display", "none")
    if (JSON.parse(localStorage.getItem('korpa'))) {
    $("#kontakt").css("display", "block")
    $('html,body').animate({
      scrollTop: $('#kontakt').offset().top
    }, 1000);
    }
    else{alert("Morate odabrati barem jedan proizvod")}
    
  })
}
function ispisProizvoda(proizvod) {  //ISPISUJE PROIZVODE
  var ispis = "";
  var div = document.getElementById("proizvod");
  for (let d of proizvod) {
    ispis += ` <div class="sorta col-sm-6 col-lg-3 col-md-3 col-xs-12 flex-wrap p-1"><div class="card">
        <div class=" alert-primary text-center pt-1" role="alert">
      <h4 class="alert-heading">${d.popust}%</h4>
    </div> 
    <img src="img/${d.slika.src}" class="card-img-top" alt="${d.slika.alt}">
    <div class="card-body">
      <h5 class="card-title">${d.naziv}</h5>
      <p class="card-text"><small>${d.opis}</small></p>
       <p><span class="text-primary font-weight-bold">${d.cena} din</span> <del>${d.stara}din</del></p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Kupi</small>
    <a href=# class="korpa" data-idp="${d.idp}"><i class="fa fa-shopping-bag mr-0" aria-hidden="true"></i></a>
    </div>
  </div>
  </div> </div>`
  }
  div.innerHTML = ispis;
  $('.korpa').click(korpa);
  $('.korpa').ready(modal);
  $('.korpa').ready(broj);
  $('.korpa').click(modal);
  $('.korpa').click(broj);
  $('#21').addClass("disabled") //uradjeno
}
function ispisiMeni(data) {   
  console.log(JSON.parse(localStorage.getItem('proizvodi'))) 
  var ispis = "";
  var div = document.getElementById("meni");
  for (let d of data) {
      ispis += `<li class="nav-item">
        <a id="${d.id}" class="nav-link" href="${d.src}">${d.naziv}</a>
      </li> `
  }
  div.innerHTML = ispis;
$('#1').click(zene)
$('#2').click(zene)
$('#10').click(otvori)
$('#20').click(svi)
}
function ispisCheck(data) { 
  //ISPISUJE CEKBOKSOVE
  var ispis = `<span class="dropdown-item-text mb-1 font-weight-bold">Filtriraj po vrsti</span><div class="d-flex flex-md-column flex-sm-column flex-xs-column flex-wrap">`;
  var div = document.getElementById("check");
  for (d of data) {
    if (d.kategorija) {
      for (let c of d.vrste) {
        ispis += `
    <div class="input-group-text">
      <input type="checkbox" id="${c.id}" class='mr-2 pomoc' aria-label="Checkbox for following text input" value=${c.id}>
      <label class="form-check-label" for="defaultCheck1">
    ${c.naziv}
  </label><span class=" ml-1 badge badge-primary badge">`
        ispis += span(c.id)          
        ispis += `</span>
    </div> `;}
 }
    div.innerHTML= ispis; 
  }
  ispis += `</div>`;
  div.innerHTML += `<div class="d-flex flex-xs-column flex-wrap">
  <span class="dropdown-item-text mb-1 font-weight-bold">Filtriraj po ceni</span>
  <a class="dropdown-item input-group-text" href="#" id="svi">Svi</a>
  <a class="dropdown-item input-group-text" href="#" id="dve">0-2000 din</a>
  <a class="dropdown-item input-group-text" href="#" id="osam">2000 din-8000 din</a>
  <a class="dropdown-item input-group-text" href="#" id="od">od 8000 din</a>
</div>`
  $('.pomoc').click(filterobuca)
  $('.dropdown-item').click(cena);
}

function broj(){ //broj korpa
  var korpa=document.getElementById('21')
  if (JSON.parse(localStorage.getItem('korpa'))!=null){
  var ispis = ` 
      <h6">${JSON.parse(localStorage.getItem('korpa')).length}</h6>`
   korpa.innerHTML=ispis;}
}
function korpa(e){
  e.preventDefault();
  var idP = $(this).data(idP);
  var proizvod = JSON.parse(localStorage.getItem('proizvodi'));
    var nizkorpa=JSON.parse(localStorage.getItem('korpa'))
    if(nizkorpa){
          for (p of proizvod) {
            if (p.idp == idP.idp ) {
              nizkorpa.push({
                idp:this.dataset.idp
              })
              localStorage.setItem('korpa', JSON.stringify(nizkorpa))
              }
            }             
          }
      else{
        let niz=[0]   //uradjeno
        niz[0]={
           idp: this.dataset.idp
        }
        localStorage.setItem('korpa', JSON.stringify(niz))
      }
    }
function svi(e) {
  e.preventDefault()
  var proizvod = JSON.parse(localStorage.getItem('proizvodi'))
  $('.pomoc').removeAttr('checked');
  localStorage.setItem('zene2', JSON.stringify(proizvod))
  ispisProizvoda(proizvod)
  localStorage.removeItem('zene')
}

function modal(){
  ispis =`<div id="bris" class="card mb-5 card mb-5 col-sm-9 col-lg-12 mx-auto">`
  var modal=document.getElementById("modal")
  var proizvod = JSON.parse(localStorage.getItem('korpa'));
  var ajax=JSON.parse(localStorage.getItem('proizvodi'))
  let nizcena = []
  if(proizvod!=null){
  for(pr of proizvod){
 var odabraniProizvod = ajax.filter(p => p.idp == pr.idp)
 for(o of odabraniProizvod){
   nizcena.push(o.cena)
    ispis+=`
     <div id="modal${o.idp}" class="row no-gutters mb-5">
            <div class="col-md-4">
           <span class=" ml-1 badge badge-primary badge float-left"></span>
            <img src=img/${o.slika.src} class="card-img" alt="${o.slika.alt}">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">${o.naziv}</h5>
                <h6 class="card-text">Cena: ${o.cena}</h6>
          </div>
            </div>
             <button type="button" class="close brisanje" data-idp="${o.idp}" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
            </div>
         `}
        } 
        ispis+=` 
        </div>`
  modal.innerHTML=ispis;
  document.getElementById("modal-footer").innerHTML=`<h5 id="cena">Ukupna cena je : ${izracunaj(nizcena)} din</h5>
   <button type="button" class="btn dalje btn-primary">Dalje</button>`
  $('.brisanje').click(brisanje)
  $('.brisanje').click(broj)}
}
function brisanje(){
  var obrisi = JSON.parse(localStorage.getItem('korpa'))
  var proizvod = JSON.parse(localStorage.getItem('proizvodi'))
  var nizCena=[]
  for (var i = 0; i < obrisi.length; i++) {
    var jedan = obrisi[i];
    if (jedan.idp == this.dataset.idp) {
      obrisi.splice(i, 1);
       localStorage.setItem('korpa', JSON.stringify(obrisi));
       $("#modal"+this.dataset.idp).remove();
    }
  }
  for (p of proizvod) {
    for(j of obrisi){
 if (p.idp == j.idp) {
   nizCena.push(p.cena)
 }
    }
  }
  document.getElementById("cena").innerHTML = `<h5 id="cena">Ukupna cena je : ${izracunaj(nizCena)} din</h5>`
}
function izracunaj(nizcena) {
  // console.log(nizcena.length>0)
  if (nizcena.length > 0){
var nizcena = nizcena
var nov = (a, b) => a + b;
return nizcena.reduce(nov)
  }
  else{
    return "0"
  }
  
}
function span(id){
  var id = id;
  var data = JSON.parse(localStorage.getItem('proizvodi'))
    console.log(data)
        var span = data.filter(x => {
        return x.id==id
        })
         let nizspan = []
         nizspan.push(span)
      var broj=nizspan.map(x=>x.length)
   return broj
}
function zene(e) {            //za zene i muskarce
  e.preventDefault();
  var sad = this.id;
  let meni = JSON.parse(localStorage.getItem('meni'))
  // console.log(meni)
 var nizpod = []
for (p of meni) {
  if (sad == p.id) {
  for (pod of p.vrste) {
     nizpod.push(pod.id)
  }
}
}
      $('.pomoc').removeAttr('checked');
        var proizvod = JSON.parse(localStorage.getItem('proizvodi'))
        // console.log(proizvod)
           proizvod = proizvod.filter(d =>nizpod.includes(d.id));
           localStorage.setItem('zene2', JSON.stringify(proizvod))
           ispisProizvoda(proizvod)
           localStorage.removeItem('zene')
      }
function search(){
  $.ajax({                             //uradjeno
    url:"json/proizvodi.json",
      dataType: "json",
      success: function (data){
        var cek = JSON.parse(localStorage.getItem('value'))
        for (ce of cek) {
          if (document.getElementById(ce).checked) {
            data = JSON.parse(localStorage.getItem('sacuvano2'))
          }
        }
       data = data.filter(p => {
           if (p.naziv.toLowerCase().indexOf(document.getElementById("search").value.toLowerCase())!=-1) {
             return true;
           }
            
         }) 
         ispisProizvoda(data);
      }
  })
}
function dva(e) {
  e.preventDefault();
  $(".sorta").removeClass("col-lg-3 col-lg-2 col-md-3").addClass("col-lg-6 col-md-6"); //ISPIS 2,4,6 uradjeno
}
function cetiri(e) {
  e.preventDefault();
  $(".sorta").removeClass("col-lg-6 col-md-6").addClass("col-lg-3 col-md-3");
}
function sest(e){
  e.preventDefault();
$(".sorta").removeClass("col-lg-6 col-lg-3").addClass("col-lg-2");
}
function cena(e) {
  e.preventDefault();
  let proizvod = JSON.parse(localStorage.getItem('zene2'))
  if (proizvod == null) {
    proizvod = JSON.parse(localStorage.getItem('proizvodi'))
  }
  var cek = JSON.parse(localStorage.getItem('value'))
  if(cek!=null){
  for (ce of cek) {
    if (document.getElementById(ce).checked) {
      proizvod = JSON.parse(localStorage.getItem('sacuvano2'))
    }
  }}
  var trenutni = this.id
  if (trenutni == "svi") {
    proizvod = proizvod
  }
  if (trenutni == "dve") {
    proizvod = proizvod.filter(x => x.cena <= 2000)
  }
  if (trenutni == "osam") {
    proizvod = proizvod.filter(x => x.cena > 2000 && x.cena <= 8000)
  }
  if (trenutni == "od") {
    proizvod = proizvod.filter(x => x.cena >= 8000)
  }
  localStorage.setItem('sacuvano', JSON.stringify(proizvod))
  localStorage.setItem('zene', JSON.stringify(proizvod))
  ispisProizvoda(proizvod)
}

function lista(){
  $.ajax({                                       //SORTIRANJE
    url:"json/proizvodi.json",
    success:function(p){ 
      var data =JSON.parse(localStorage.getItem('zene2'));
      if (JSON.parse(localStorage.getItem('zene')) != null) {
        data = JSON.parse(localStorage.getItem('zene'))

      }
     var cek = JSON.parse(localStorage.getItem('value'))
     if(data==null){
       data=p
     }
     if(cek!=null){
      for (ce of cek) {
        if (document.getElementById(ce).checked) {
          data = JSON.parse(localStorage.getItem('sacuvano2'))
          if (JSON.parse(localStorage.getItem('sacuvano'))!=null){
            data = JSON.parse(localStorage.getItem('sacuvano'))

          }
        }
      }
     }
  if(document.getElementById("lista").value==1){
   data.sort(function(a,b){
      if(a.naziv>b.naziv){return 1}
      else{return -1}
    })
  }

     if (document.getElementById("lista").value == 2) {
        data.sort(function (a, b) {
         if (a.cena > b.cena) {
           return 1;
         } else if (a.cena < b.cena) {
           return -1;
         } else {
           return 0;
         }
       })
     }
     if (document.getElementById("lista").value == 5) {
       data.sort(function (a, b) {
         if (a.popust<b.popust) {
           return 1;
         } else if (a.popust>b.popust) {
           return -1;
         } else {
           return 0;
         }
       })
     }
      if (document.getElementById("lista").value == 3) {
        data.sort(function (a, b) {
          if (a.cena > b.cena) {
            return -1;
          } else if (a.cena < b.cena) {
            return 1;
          } else {
            return 0;
          }
        })
      }
      if(document.getElementById("lista").value==4){
        data.sort(function(a,b){
          var prvi = new Date(a.datum);
          var drugi = new Date(b.datum);
            if(prvi>drugi){
           return -1
         }
         else{
           return 1
         }

        })
      }
        ispisProizvoda(data)
     
    }

  })
}
function filterobuca() {   
   let cekiran = $('.pomoc:checked').get()
   let niz=[]
   let nizValue=[]
    niz.push(cekiran)
    for(n of niz){
      for(m of n)
      { nizValue.push(m.value) }
    }
 localStorage.setItem('value',JSON.stringify(nizValue))                       
    var  proizvod = JSON.parse(localStorage.getItem('proizvodi'));
       if (nizValue.length>0) {
          proizvod = proizvod.filter(d => nizValue.includes(d.id.toString()));
              localStorage.setItem('sacuvano2', JSON.stringify(proizvod));
             // console.log(JSON.parse(localStorage.getItem('sacuvano')))
             localStorage.removeItem('sacuvano')
         return ispisProizvoda(proizvod)
        }
      else {
       return ispisProizvoda(proizvod)
      }
}

  function provera(e){
    e.preventDefault();
    var ime = document.getElementById("ime").value;
    var prezime = document.getElementById("prezime").value;
    var adresa=document.getElementById("pass").value;
    var email=document.getElementById("email").value;
    var poruka=document.getElementById("jedan");
    var poruka1 = document.getElementById("dva");
    var poruka2=document.getElementById("tri");
    var poruka3 = document.getElementById("cetiri");
    var imeReg = /^([A-Z][a-z]{2,15}(\s)?)+$/;
    var emailReg = /^([a-z]{2,9}(\.)?)+(\d{1,4}(\.)?)*\@(\w{2,5}(\.)?)+$/;
    var adresaReg = /^([A-Za-z]{3,15}(\s)?)+(\d{1,3}\s)([A-Za-z]{3,15}(\s)?)+(\d{5})$/;
    var nizGresaka=[]
    proveri(ime, poruka, imeReg, nizGresaka)
    proveri(prezime, poruka1, imeReg, nizGresaka)
    proveri(email,poruka3,emailReg, nizGresaka)
    proveri(adresa,poruka2, adresaReg, nizGresaka)
    if(nizGresaka==0 && document.getElementById("cek").checked){
      document.getElementById("alert").classList.add("skriveno");
        localStorage.removeItem('korpa')
      $("#bris").remove();
      $("#cena").remove()
      $("#kontakt").css("display", "none")
      $('html,body').animate({
        scrollTop: $('.navbar').offset().top
      }, 1000);
       $("#21").hide();
    }
  }
  function proveri(ime, poruka, imeReg, nizGresaka) {
    // console.log(imeReg)
    if (!imeReg.test(ime) || ime == "") {
      nizGresaka.push(ime);
      poruka.classList.add("invalid-feedback");
      poruka.innerHTML= "Niste uneli dobar format!";
    } else {
      poruka.classList.remove("invalid-feedback");
      poruka.classList.add("valid-feedback")
     poruka.innerHTML = "Dobro napisano!";
    }
    
  }
  // function ukloniValue(parametar){
  //   console.log(parametar)
  //   parametar=""

  // }
