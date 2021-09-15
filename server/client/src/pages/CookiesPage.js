import React, { Component } from 'react';

class CookiesPage extends Component {
    render() {
        return (
            <>
                <div>
                    <section className="d-flex align-items-center odd-section">
                        <div className="container">
                            <div className="row">
                                <h3>Evästeet</h3>
                                <p>
                                    <h2>Eväste eli cookie</h2>
                                    &nbsp; on lyhyt tekstitiedosto, jonka verkkopalvelin pyytää saada tallentaa tietokoneelle (ml. mobiililaitteet) vierailijan tunnistamiseksi verkkosivustolla. Evästeiden avulla palveluntarjoaja voi kehittää palveluaan entistä asiakasystävällisemmäksi, analysoimaan sivustonsa käyttöä ja tarjota asiakkailleen kohdennettuja tuotesuosituksia, tarjouksia ja muita etuja.
                                </p>
                                <p>Käyttäjä voi torjua evästeiden käytön käyttämänsä selaimen asetuksista tai poistamalla evästeet selaimestaan verkkopalvelun käytön lopetuksen jälkeen. Lisätietoja selainkohtaisista käyttöohjeista saa selaimen valmistajan ohjeista. Verkkopalveluun sisältyvät toiminnot voivat kuitenkin edellyttää evästeiden hyväksymistä toimiakseen.</p>
                                <p>
                                    <h2>Evästeet vaikuttava.io sivustolla</h2>
                                </p>
                                <p>Käytetyt evästeet voivat olla pitkä- tai lyhytkestoisia. Pitkäkestoiset evästeet pysyvät tallessa sille asetettuun aikarajaan asti. Pysyviä evästeitä käytetään mm. tukemaan kaupan toiminnallisuutta sekä sivuston sisäisen haun parantamiseen.</p>
                                <p>Lyhytaikaiset (ns. istuntokohtaiset) evästeet tallentuvat vain verkkosivustolla vierailun ajaksi käyttäjän laitteelle. Lyhytaikainen eväste häviää heti, kun verkkoselain suljetaan.</p>
                                <p>
                                    <em>Kolmansien osapuolien käyttö sekä tietojen siirto EU:n tai ETA:n ulkopuolelle</em>
                                </p>
                                <p>Käytämme kävijätietojen analysointiin, markkinoinnin uudelleenkohdistamiseen ja bannerimainontaan sellaisten ulkopuolisten tahojen palveluja, jotka käyttävät sivustoillamme evästeitä. Tällaisia palveluntarjoajia ovat seuraavat tahot:</p>
                                <p>

                                    <em>Google Analytics</em>
                                    : Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
                                    <br />

                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </>

        );
    }
}

export default CookiesPage;