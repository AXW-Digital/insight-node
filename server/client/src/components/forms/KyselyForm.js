import React, { Component } from 'react'
import FormFunction from './FormFunction'

import kyselyt from '../../assets/js/kyselyt'

export default function KyselyForm(props) {
    var title = kyselyt.map((d) => d.kyselyTitle)[props.question]
    return (


        <div>

            <FormFunction
                question={props.question}
                title={title}
                currentPoints={props.currentPoints}
            />

        </div>
    )
}
