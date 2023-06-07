import React from 'react'

export const EmailCampaign = ({campaign}) => {

    const {
        id,
        channel,
        name,
        host,
        prompts,
        body,
        target,
        filter,
        daisychain,
        performance,
      } = campaign;

  return (
    <div>{name}</div>
  )
}
