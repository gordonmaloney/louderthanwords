import React from 'react'

export const TwitterCampaign = ({campaign}) => {

    const {
        id,
        channel,
        title,
        host,
        prompts,
        body,
        target,
        filter,
        daisychain,
        performance,
      } = campaign;

  return (
    <div>{title}
    <br/>
    {}
    </div>
  )
}
