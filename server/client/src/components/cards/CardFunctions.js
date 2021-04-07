import FormCard from './FormCard'
import ActivityCard from './ActivityCard'
import {ActivityCardSmall} from './ActivityCard'


// Function that creates the card content for the mapping function
function createCard(cardContent){
    return (
        <FormCard
        key = {cardContent.id}
        name = {cardContent.name}
        picUrl = {cardContent.picUrl}
        formTitle = {cardContent.formTitle}
        formText = {cardContent.formText}
        formUrl = {cardContent.formUrl}
        color = {cardContent.color}
        minutes = {cardContent.minutes}
        tyyppi = {cardContent.tyyppi}
        />
    )
}

export {createCard}

function createActivityCard(Content){
    return(
        <ActivityCard
        key = {Content.id}
        boxIcon = {Content.boxIcon}
        count = {Content.count}
        cardText = {Content.cardText}
        suffix = {Content.suffix}
        color = {Content.color}
        />
    )
}
export {createActivityCard}

function createSmallActivityCard(Content){
    return(
        <ActivityCardSmall
        key = {Content.id}
        boxIcon = {Content.boxIcon}
        count = {Content.count}
        cardText = {Content.cardText}
        suffix = {Content.suffix}
        color = {Content.color}        
        />
    )
}

export {createSmallActivityCard}

