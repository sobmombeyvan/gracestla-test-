import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-hero-kicker">Notre histoire</p>
          <h1>Et si ton expérience Au Pair ne dépendait plus de la chance&nbsp;?</h1>
          <p>
            Tu n’es probablement pas arrivé(e) ici par hasard.
            <br />
            Prends quelques minutes pour comprendre pourquoi Grâce est là existe.
          </p>
        </div>
      </section>

      <article className="about-article">
        <div className="about-article-inner">
          <section className="about-block">
            <h2>Notre histoire</h2>
            <p>
              Si tu lis ces quelques lignes, c’est peut-être parce que toi aussi, tu rêves de
              partir à l’étranger, de découvrir une nouvelle culture, d’améliorer une langue,
              de rencontrer une famille d’accueil et de vivre une expérience qui marquera un
              tournant dans ta vie.
            </p>
            <p>
              Le programme Au Pair est une aventure extraordinaire. Chaque année, des milliers
              de jeunes choisissent de quitter leur pays pour découvrir le monde, gagner en
              autonomie, partager le quotidien d’une famille et vivre une expérience humaine
              unique.
            </p>
            <p>
              Mais derrière les magnifiques photos publiées sur les réseaux sociaux se cache
              une réalité que l’on évoque rarement.
            </p>
            <p>
              Partir Au Pair, ce n’est pas seulement prendre un avion. C’est quitter ses
              repères. C’est faire confiance à une famille que l’on n’a encore jamais
              rencontrée. C’est s’adapter à une nouvelle culture, à une nouvelle langue, à un
              nouveau mode de vie. Et parfois, c’est aussi apprendre à gérer des situations
              auxquelles on ne s’attendait pas.
            </p>
            <p>
              Avant de partir, beaucoup de jeunes se posent les mêmes questions. Est-ce que
              la famille me correspondra vraiment&nbsp;? Serai-je bien accueillie&nbsp;? Les
              missions seront-elles conformes à ce qui a été annoncé&nbsp;? Comment réagir
              si je rencontre une difficulté&nbsp;? Vers qui pourrai-je me tourner si je me
              sens seule&nbsp;?
            </p>
            <p>
              Ces questions sont normales. Parce qu’au-delà d’un voyage, devenir jeune Au Pair
              est avant tout une aventure humaine. Et une aventure humaine mérite d’être
              préparée.
            </p>
          </section>

          <section className="about-block about-block--story">
            <div className="about-story-grid">
              <div>
                <h2>Une expérience qui a tout changé</h2>
                <p>
                  En 2022, j’ai moi aussi décidé de devenir jeune fille Au Pair. Comme beaucoup
                  de jeunes, je suis partie avec des rêves plein la tête. Je voulais découvrir
                  une nouvelle culture, perfectionner une langue étrangère, rencontrer de
                  nouvelles personnes et vivre une expérience qui me ferait grandir.
                </p>
                <p>
                  Avant mon départ, tout semblait réuni pour que cette aventure soit une
                  réussite. Les échanges avec ma future famille étaient chaleureux. Nous avions
                  parlé des enfants, des horaires, des responsabilités et de notre future
                  organisation. Je me sentais en confiance.
                </p>
                <p>
                  Puis je suis arrivée. Les premiers jours se sont bien passés. Mais au fil
                  des semaines, certaines choses ont commencé à changer. Les attentes
                  évoluaient. Les repères que nous avions construits avant mon départ
                  devenaient de moins en moins clairs. Je ne retrouvais plus l’équilibre que
                  j’avais imaginé.
                </p>
                <p>
                  Le plus difficile n’était pas seulement la situation. Le plus difficile,
                  c’était de ne pas savoir vers qui me tourner. Quand on est loin de sa
                  famille, de ses amis et de son pays, le moindre doute peut prendre une place
                  immense. On hésite à poser des questions. On se demande si l’on exagère. On
                  essaie de s’adapter. On se persuade que tout ira mieux demain.
                </p>
                <p>
                  Puis un jour, tout s’est arrêté. La collaboration avec la famille a pris
                  fin. Je me suis retrouvée seule, avec mes valises, dans un pays étranger,
                  sans logement et avec énormément d’incertitudes.
                </p>
                <p>
                  Je n’oublierai jamais cette période. Non pas parce qu’elle a été difficile.
                  Mais parce qu’elle m’a fait comprendre une chose essentielle.
                </p>
              </div>
              <aside className="about-founder">
                <img
                  src="https://i.ibb.co/xqzyJS0v/PHOTO-2026-05-31-11-03-50.jpg"
                  alt="Gracela — Fondatrice de Grâce est là"
                  className="founder-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/600x800/E5D9D7/5A474A?text=Portrait+Fondatrice';
                  }}
                />
                <p className="founder-caption">Gracela — Fondatrice de Grâce est là</p>
              </aside>
            </div>
          </section>

          <section className="about-block">
            <h2>Ce n’est pas le programme qui pose problème</h2>
            <p>
              Avec le recul, j’ai compris que le programme Au Pair est une expérience
              extraordinaire. Il permet chaque année à des milliers de jeunes de vivre des
              moments inoubliables. De créer des liens. D’apprendre une langue. De découvrir
              une autre façon de vivre. De gagner en confiance.
            </p>
            <p>
              Le véritable problème n’est pas le programme. Le véritable défi, c’est de
              partir sans être suffisamment préparé, accompagné et soutenu.
            </p>
            <p>
              Une belle expérience Au Pair ne repose pas uniquement sur une famille ou sur
              une jeune. Elle repose sur une rencontre entre deux projets de vie. Deux
              cultures. Deux façons de fonctionner. Deux personnes qui vont partager le même
              quotidien. Et cette rencontre ne devrait jamais être laissée au hasard.
            </p>
          </section>

          <section className="about-block about-block--highlight">
            <h2>C’est ainsi qu’est née Grâce est là</h2>
            <p>
              Après cette expérience, une question ne cessait de revenir dans mon esprit.
              Et si quelqu’un avait été là pour m’accompagner&nbsp;? Une personne capable de
              répondre à mes questions. De m’aider à mieux préparer mon départ. De vérifier
              que la famille me correspondait réellement. De rester présente si une
              difficulté apparaissait.
            </p>
            <p>Cette personne n’existait pas. Alors j’ai décidé de la créer.</p>
            <p>
              C’est ainsi qu’est née Grâce est là. Une entreprise fondée sur une conviction
              simple&nbsp;: une expérience Au Pair réussie commence bien avant le départ.
            </p>
            <p>
              Chez Grâce est là, nous prenons le temps de connaître chaque jeune. Son
              histoire. Sa personnalité. Ses motivations. Ses attentes. Ses limites. Ses
              craintes. Nous faisons exactement le même travail avec les familles d’accueil.
            </p>
            <p>
              Parce qu’un bon matching ne se résume pas à une destination, à des horaires
              ou à une disponibilité. Il repose avant tout sur des valeurs communes, une
              communication transparente et une véritable compatibilité humaine.
            </p>
          </section>

          <section className="about-block">
            <h2>Plus qu’une mise en relation</h2>
            <p>
              Notre mission ne consiste pas simplement à mettre une famille et une jeune Au
              Pair en contact. Nous souhaitons créer les meilleures conditions pour que cette
              expérience fonctionne réellement.
            </p>
            <p>
              Nous accompagnons chaque étape du parcours. Avant le départ, nous aidons les
              jeunes à mieux comprendre le programme, à poser les bonnes questions, à
              connaître leurs droits, leurs responsabilités et à préparer leur arrivée.
            </p>
            <p>
              Nous accompagnons également les familles afin de clarifier leurs attentes, leur
              organisation et le profil qui correspond réellement à leur mode de vie.
            </p>
            <p>
              Une fois l’expérience commencée, nous restons présents. Parce que les
              questions n’apparaissent pas uniquement avant le départ. Elles apparaissent
              souvent une fois sur place.
            </p>
            <p>
              Être accompagné, c’est aussi savoir que quelqu’un est là pour écouter,
              conseiller, rassurer et aider à trouver des solutions lorsque cela devient
              nécessaire.
            </p>
          </section>

          <section className="about-block about-block--mission">
            <h2>Notre mission</h2>
            <p>
              Chez Grâce est là, nous croyons qu’une expérience Au Pair ne devrait jamais
              dépendre de la chance. Nous croyons qu’une bonne préparation permet d’éviter
              de nombreuses difficultés. Nous croyons qu’une relation de confiance se
              construit avant même la première rencontre. Nous croyons qu’une famille mérite
              d’être accompagnée autant qu’une jeune Au Pair. Et nous croyons surtout
              qu’aucune personne ne devrait avoir à vivre cette aventure seule.
            </p>
            <p className="about-ambition">
              Notre ambition est simple&nbsp;: créer des expériences Au Pair sereines,
              équilibrées et enrichissantes. Des expériences où chacun se sent respecté.
              Écouté. Préparé. Accompagné.
            </p>
            <p>
              Parce qu’une belle aventure ne commence pas le jour où l’on monte dans un
              avion. Elle commence bien avant. Elle commence lorsqu’on prend le temps de
              comprendre ton projet. De répondre à tes questions. De te préparer. Et de
              t’accompagner à chaque étape.
            </p>
            <p className="about-closing">
              Grâce est là.
              <br />
              Avant ton départ.
              <br />
              Pendant ton séjour.
              <br />
              Et bien après ton retour.
            </p>
          </section>

          <div className="about-cta">
            <h3>Tu veux vivre cette aventure avec un accompagnement&nbsp;?</h3>
            <p>
              Parle-nous de ton projet. Nous prenons le temps de t’écouter, de répondre à
              tes questions et de t’accompagner à chaque étape.
            </p>
            <div className="about-cta-actions">
              <Link to="/reservation" className="btn-accompany">
                Je veux être accompagné(e)
              </Link>
              <Link to="/services" className="about-cta-link">
                Découvrir nos services
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default About;
