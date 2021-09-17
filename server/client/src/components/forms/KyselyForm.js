import React, { Component } from 'react'
import FormFunction from './FormFunction'
import FormFunctionLanding from './FormFunctionLanding'
import kyselyt from '../../assets/js/kyselyt'
import { ReactComponent as Answered } from '../../assets/images/answered.svg';
import Loader from '../parts/Loader';

export default function KyselyForm(props) {
    var title = props.kyselyt.map((d) => d.kyselyTitle)[props.question]
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
                surveyAns = surveyAns.list.filter(x => x.id === surveyId)
                if ( surveyAns.length > 0 ){
                    hoursSinceSubmit = surveyAns[0].diff
                }
                
            }
            var SurveyResetTime = surveyList.filter(x => x.id === props.question + 1);
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
                                kyselyt={props.kyselyt}
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
    var title = props.kyselyt.map((d) => d.kyselyTitle)[props.question]
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
            var SurveyResetTime = surveyList.filter(x => x.id === props.question + 1);
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
                        <div className='container'>
                            <div>
                                <p>
                                    Olet jo vastannut tähän kysymykseen :(
                                </p>
                            </div>
                        </div>
                    )
                default:
                    return (

                        <div>

                            <FormFunction
                                question={props.question}
                                title={title}
                                currentPoints={props.currentPoints}
                                kyselyt={props.kyselyt}
                            />

                        </div>
                    )

            }

    }
}

export { KyselyFormBoost }
