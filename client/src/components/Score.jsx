import {useState} from 'react';
const Score = props => {
    const {player,num,total} = props;
    

    return(
        <tr>
            <td>{num}</td>
            <td>{player.user.firstName} {player.user.lastName}</td>

            {
            player.scores.map((s,i) => {
                return(
                        <td key={i}>
                            {s}
                        </td>
                        
                )
            })
            }
            {player.scores.length === 18 ?<td>{total}</td> : ""}
        </tr>
    )
}

export default Score;