import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Timeline from "@/src/components/builder/Timeline/Timeline";
import Heading from "../../components/structure/Heading/Heading";
import Footer from "../../components/structure/Footer/Footer";

export default function Page() {

  const dataTimeline = {
    subtitle: 'Saráchaga, un apellido con más de ochenta años junto al arte',
    years: [
      {
        date: '1938',
        description: 'Inaugurada en 1938 por Juan Daniel Saráchaga que advirtió el enorme potencial que existía en las subastas de arte.',
        photo: { 
          url: 'assets/images/timeline_img_demo_1.jpg',
          alt: 'Descripción de la imagen'
        }
      },
      {
        date: '1958',
        description: 'Sus comienzos se centraron en los remates oficiales hasta que en 1958 amplió su negocio a subastas de arte de colecciones privadas. Comenzó a organizar significativos o relevantes remates de obras importantes, que se convirtieron en grandes eventos sociales que marcaban agenda en Buenos Aires.',
      },
      {
        date: '1968',
        description: 'En 1968 se hizo evidente que era necesario cambiar la modalidad de estos grandes eventos ya que era muy difícil obtener residencias adecuadas para presentar estas subastas.',
      },
      {
        date: '1972',
        description: 'Se concretó un acuerdo con el Hotel Alvear de Buenos Aires hasta el año  1972, período en el que se recuerdan subastas memorables como las de  Leticia Vega de Vigil y el de José León Pagano. A partir de ese momento los hermanos Martín y Juan Antonio Saráchaga se hicieron cargo de la casa junto a su padre. Integran a su actividad la sección de platería colonial y criolla, con notables remates de  colecciones de Elisa Peña, Gustavo Barreto, Anasagasti, Gónzalez álzaga y Victoria Aguirre, entre otros.',
      },
      {
        date: '1973',
        description: 'El gran momento que marcó un antes y un después en la empresa fue la subasta de la colección Moretón, una de las ventas de pintura argentina más importante realizada en Argentina, en la cual se vendió en septiembre de 1973, el óleo "La canción del pueblo" de Emilio Pettoruti que actualmente se exhibe en el MALBA.',
        photo: { 
          url: 'assets/images/timeline_img_demo_2.jpg',
          alt: 'Descripción de la imagen'
        }
      },
      {
        date: '1998',
        description: 'En 1998, tras el prematuro fallecimiento de Martín Saráchaga padre, se cerró una etapa e impulsó la incorporación a la empresa familiar de Martin Saráchaga hijo quien aporto dinamismo y gestión de nuevos proyectos.',
      },
      {
        date: '2004',
        description: 'En 2004 en vista a los nuevos desafíos que impone el sector, Martín (h) y Juan Antonio dividen sus caminos. Martín Saráchaga, actual CEO & Director de la Casa, quien conduce junto a sus hermanas María, Manuela y Milagros, estos nuevos desafíos, acercar el arte a públicos heterogéneos, mientras se adapta a  las nuevas plataformas de comunicación.',
      },
      {
        date: '2018',
        description: 'Martin Saráchaga Subastas celebró en 2018 el octogésimo aniversario de  su fundación. Con una historia por demás interesante y tras tres generaciones, Martín Saráchaga continúa el legado familiar con determinación y experiencia.',
      }
    ]
  }
  

  return (
    <MainWrapper>  
        <Heading data={{heading: 'LA CASA'}} />
        <Timeline data={dataTimeline} />
        <Footer />
    </MainWrapper>      
  );
}