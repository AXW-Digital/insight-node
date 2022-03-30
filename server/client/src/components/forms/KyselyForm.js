/* eslint-disable */
 
import React, { Component } from 'react'
import FormFunction from './FormFunction'
import FormFunctionLanding from './FormFunctionLanding'
import kyselyt from '../../assets/js/kyselyt'
import { ReactComponent as Answered } from '../../assets/images/answered.svg';
import Loader from '../parts/Loader';

export default function KyselyForm(props) {
    var kysely = props.kyselyt.filter(x => x.id == props.question)
    var title = kysely[0].kyselyTitle
    var surveyId = parseInt(props.question)
    surveyId = surveyId.toString();
    var surveyAns = props.surveyAns


    switch (surveyAns) {
        case null:
            return (
                <Loader />
            )

        case undefined:
            return (
                <Loader />
            )

        case []:
            return (
                <Loader />
            )

        default:
            
            var renewSurvey
            var hoursSinceSubmit = 0
            const surveyList = props.kyselyt;
            // console.log('surveyAns:', surveyAns)
            if (surveyAns !== [] && surveyAns !== undefined && surveyAns.id.length > 0) {
                surveyAns = surveyAns.list.filter(x => x.id === (parseInt(surveyId)).toString())
                if ( surveyAns.length > 0 ){
                    hoursSinceSubmit = surveyAns[0].diff
                } else {
                    hoursSinceSubmit = 99999
                }
                
            }
            var SurveyResetTime = surveyList.filter(x => x.id === parseInt(props.question));
            if (SurveyResetTime.length > 0) {
                SurveyResetTime = SurveyResetTime[0].resetHours;
            } else {
                SurveyResetTime = 1
            }
            
            // check if enough time has passed since survey was ansered
            if (hoursSinceSubmit !== 0){
                SurveyResetTime <= hoursSinceSubmit ? renewSurvey = true : renewSurvey = false
            } else {
                renewSurvey = true
            }
            
            switch (renewSurvey) {
                case false:
                    return (
                        <div>
                            Olet jo vastannut tähän kysymykseen :(
                            <Answered />
                        </div>
                    )
                default:
                    return (

                        <div>

                            <FormFunction
                                question={props.question}
                                title={title}
                                currentPoints={props.currentPoints}
                                kyselyt={kysely}
                            />

                        </div>
                    )

            }

    }

}

function KyselyFormLanding(props) {


    return (

        <div>

            <FormFunctionLanding
                question={props.question}
                currentPoints={props.currentPoints}
                kyselyt={props.kyselyt}
            />

        </div>
    )

}







export { KyselyFormLanding }

function KyselyFormBoost(props) {
    var kysely = props.kyselyt.filter(x => x.id == props.question)
    var title = kysely[0].kyselyTitle
    var surveyId = parseInt(props.question)
    surveyId = surveyId.toString();
    var surveyAns = props.surveyAns


    switch (surveyAns) {
        case null:
            return (
                <Loader />
            )

        case undefined:
            return (
                <Loader />
            )

        default:
            surveyAns = surveyAns.list.filter(x => x.id === surveyId)
            const surveyList = props.kyselyt;
            var renewSurvey
            var hoursSinceSubmit = 0
            if (surveyAns !== [] && surveyAns !== undefined && surveyAns.length > 0) {
                hoursSinceSubmit = surveyAns[0].diff
            }
            var SurveyResetTime = surveyList.filter(x => x.id === parseInt(props.question));
            SurveyResetTime = SurveyResetTime[0].resetHours;
            // check if enough time has passed since survey was ansered
            if (hoursSinceSubmit !== 0){
                SurveyResetTime <= hoursSinceSubmit ? renewSurvey = true : renewSurvey = false
            } else {
                renewSurvey = true
            }
            switch (renewSurvey) {
                case false:
                    return (
                        <div className='container kysely-home'>
                            <div>
                                <p>
                                    Olet jo vastannut tähän kysymykseen :(
                                </p>
                            </div>
                        </div>
                    )
                default:
                    return (

                        <div className='kysely-home'>

                            <FormFunction
                                question={props.question}
                                title={title}
                                currentPoints={props.currentPoints}
                                kyselyt={kysely}
                            />

                        </div>
                    )

            }

    }
}

export { KyselyFormBoost }
