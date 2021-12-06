import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDotCircle, faEllipsisV, faEnvelope, faEye, faPen, faPlay, faSearch, faShare, faTag } from '@fortawesome/free-solid-svg-icons'
import { faFolder, faHeart } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'


export default function Wallet(props) {
    return (
        <>
            <section className="notification-section mb-5">
                <div className="container">


                    <div className="row">
                        <div className="col-12 ">
                            <h1 className="text-center mb-5 ">Connect Wallet</h1>

                        </div>

                        <div className="col-12 col-md-4 wallet-col">
                            <div className="wallet-col-desc">
                                
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
