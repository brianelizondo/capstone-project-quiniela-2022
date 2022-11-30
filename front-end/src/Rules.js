import React from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import "./Rules.css";

function Rules(){
    return (
        <div className="Rules col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Rules for Quinielas World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>List of rules by which the Quinielas World Cup 2022 will be guided</h5>
                </Col>
            </Row>
            <Row>
                <Col className="Rules-list">
                    <Tabs defaultActiveKey="english" id="justify-tab" className="mb-3" justify>
                        <Tab eventKey="english" title="English">
                            <h5>1. About Registration</h5>
                            <p>
                            The registration fee for each participant in the 2016 Cup Pools is $20 for each ticket registered by the participant. This registration cost for each form will go 90% ($18) to the "pot" of the pool and the remaining 10% ​​($2) will be for expenses related to the website of the Quinielas World Cup 2022.
                
                            After completing the participant registration process and filling in one or more quinielas, the participant must make the registration payment for each quiniela they wish to register. This payment must be made through the payment platform provided for this purpose.    
                            </p>
                            
                            <h5>2. About the prizes for the Winners</h5>
                            <p>
                            The accumulated amount of the registered quiniela called "pot" will be allocated entirely as a prize for those participants who are declared winners after the quiniela ends. The winners will be the FIRST TWO participants who obtain the highest sum of points in the general position table of the quiniela, which can be reviewed daily and after each match concluded on the website of the quiniela.
                
                            The "pot" will be divided into two parts for the awarding of the winners. These parts will be divided as follows:
                            70% of the total "pot": It will be awarded to the participant with the highest number of points accumulated in the quiniela according to the standings of the Quinielas World Cup 2022.
                            Remaining 30% of the "pot": It will be awarded to the second participant with the highest number of points accumulated in the pool according to the standings of the Quinielas World Cup 2022.

                            Note: If there are winning participants with equal points, the respective prize for the position will be divided equally and awarded to each participant with equal scores.
                            </p>
                            
                            <h5>3. About how to get points</h5>
                            <p>
                            The participants of the Quinielas World Cup 2022 will be able to obtain points in each finished match. The points awarded to each participant will be governed as follows:
                
                            - Five (5) points for Exact Result: If the participant guesses the exact result of a match. It can be a winner/loser or a draw. This score excludes additional points for guessing the Winner/Loser or Draw in a match played.
                            - Three (3) points for guessing Winner/Loser: If the participant guesses the winning team and the losing team of a game but without guessing the goals scored by the teams in the game.
                            - Three (3) points for scoring a Draw: If the participant guesses if a game ended draw, but without scoring the goals scored by the teams in the game.

                            Additional points in Second Phase:
                            - Ten (10) points per Classified Team: They will be awarded for each successful team that has qualified for the Eighth Finals, Quarter Finals and Semifinals.
                            - Twenty (20) points per Finalist Team: They will be awarded for each successful team that has qualified for the final.
                            - Twenty (20) points for the Champion Team: They will be awarded for hitting the winning team.

                            Notes:
                            - If the participant does not guess the result, goals or classified teams, no score is generated. The match for Third Place will not generate points for a correct team, it will only generate points for the result of the match.
                            - The Second Phase matches. Phase (Round of 16, Quarter-finals, Semi-finals, Third Place and Final) will only generate and will be assigned points for the result of the match in Regular Time (90 minutes) and Extra-time (30 minutes). If the match goes to penalty kicks, the result is not valid for the allocation of points.    
                            </p>

                            <h5>4. About the website</h5>
                            <p>
                            On the website of the Quinielas World Cup 2022 you can verify the number of registered quinielas, accumulated amount of the "pot", match schedule, groups, team positions, match results, teams and general statistics. In addition, each participant will be able to verify the points obtained for each game and the position table of each participant with respect to the others.    
                            </p>

                            <h5>5. About the registration form and filling out the quiniela</h5>
                            <p>
                            The Quinielas World Cup 2022 website will have a registration section where each participant can register and fill in their personal data and then fill in their quinielas.
                                    
                            After the quinielas has been completed and saved in the database, the participant may make changes to their quinielas until 11/19/2022 at the latest, after which date the quinielas registration and modification process will be closed.
                            
                            The quinielas that remain with empty data in results, goals or classified teams will not generate points for the participant and will remain inactive.
        
                            Those participants who have not paid the registration amount for each registered quiniela will not be activated by the time the quiniela starts and will not be able to participate in it.
        
                            The Quinielas World Cup 2022 will start with the first match of the FIFA World Cup 2022 and will conclude with the final match. After this, the winners of the pool will be declared and the respective prize will be awarded based on the final position table and rules shown here for the Quinielas World Cup 2022.    
                            </p>
                        </Tab>
                        <Tab eventKey="spanish" title="Spanish">
                            <h5>1. Acerca del registro</h5>
                            <p>
                            La cuota de inscripción de cada participante en la Quiniela World Cup 2022 es de $25 por cada quiniela registrada por el participante. Este costo de inscripción por cada quiniela irá en un 90% ($18) al "pote" de la quiniela y el 10% restante ($2) será para gastos relacionados con la página web de Quinielas World Cup 2022.
                
                            Luego de completar el proceso de inscripción del participante y llenar una o más quinielas, el participante deberá realizar el pago de inscripción por cada quiniela que desee inscribir. Este pago deberá realizarse a través de la plataforma de pago habilitada para tal fin.
                            </p>
                            
                            <h5>2. Sobre los premios para los Ganadores</h5>
                            <p>
                            El importe acumulado de la quiniela inscrita denominada "pote" se destinará íntegramente a premios para aquellos participantes que sean declarados ganadores una vez finalizada la quiniela. Los ganadores serán los DOS PRIMEROS participantes que obtengan la mayor suma de puntos en la tabla de posiciones generales de la quiniela, la cual podrá ser revisada diariamente y después de concluido cada partido en la página web de la quiniela.
                
                            El "pote" se dividirá en dos partes para la premiación de los ganadores. Estas partes se dividirán de la siguiente manera:
                            - 70% del total del "pote": Se otorgará al participante con más puntos acumulados en la quiniela según la clasificación de la Quinielas World Cup 2022.
                            - 30% restante del "pote": Se otorgará al segundo participante con más puntos acumulados en la quiniela según la clasificación de la Quinielas World Cup 2022.

                            Nota: Si hay participantes ganadores con puntos iguales, el premio respectivo para el puesto se dividirá en partes iguales y se otorgará a cada participante con puntos iguales.
                            </p>
                            
                            <h5>3. Acerca de cómo obtener puntos</h5>
                            <p>
                            Los participantes de la Quinielas World Cup 2022 podrán obtener puntos en cada partido finalizado. Los puntos otorgados a cada participante se regirán de la siguiente manera:
                
                            - Cinco (5) puntos por Resultado Exacto: Si el participante acierta el resultado exacto de un partido, puede ser Ganador/Perdedor o Empate. Esta puntuación excluye los puntos adicionales por acertar el Ganador/Perdedor o Empate en un partido jugado.
                            - Tres (3) puntos por acertar Ganador/Perdedor: Si el participante acierta el equipo ganador y el equipo perdedor de un partido pero sin acertar los goles marcados por los equipos en el partido.
                            - Tres (3) puntos por acertar un Empate: Si el participante acierta si un partido terminó en empate, pero sin acertar los goles marcados por los equipos en el juego.

                            Puntos adicionales en Segunda Fase:
                            - Diez (10) puntos por Equipo Clasificado: Se otorgarán por cada equipo acertado que haya clasificado a Octavos de Final, Cuartos de Final y Semifinales.
                            - Veinte (20) puntos por Equipo Finalista: Se otorgarán por cada equipo acertado que haya clasificado para la final.
                            - Veinte (20) puntos para el Equipo Campeón: Se otorgarán por acertar al equipo ganador.

                            Notas:
                            - Si el participante no acierta el resultado, goles o equipos clasificados, no se genera puntuación. El partido por el Tercer Lugar no generará puntos por un equipo correcto, solo generará puntos por el resultado del partido.
                            - Los partidos de la Segunda Fase (Octavos de Final, Cuartos de Final, Semifinales, Tercer Puesto y Final) solo generará y se asignarán puntos por el resultado del partido en Tiempo Reglamentario (90 minutos) y Tiempo Extra (30 minutos). Si el partido va a definición por penales, el resultado de esta definición no es válido para la asignación de puntos.
                            </p>

                            <h5>4. Acerca del sitio web</h5>
                            <p>
                            En la web de la Quinielas World Cup 2022 se puede consultar el número de quinielas inscritas, importe acumulado del "pote", calendario de partidos, grupos, posiciones de los equipos, resultados de los partidos, equipos y estadísticas generales. Además, cada participante podrá comprobar los puntos obtenidos en cada juego y la tabla de posiciones de cada participante con respecto a los demás.
                            </p>

                            <h5>5. Sobre el formulario de inscripción y llenado de la quiniela</h5>
                            <p>
                            El sitio web de la Quinielas World Cup 2022 contará con una sección de registro donde cada participante podrá registrarse y llenar sus datos personales para luego llenar sus quinielas.
                                    
                            Una vez completadas y guardadas las quinielas en la base de datos, el participante podrá realizar cambios en sus quinielas hasta el 19/11/2022, fecha a partir de la cual se cerrará el proceso de registro y modificación de quinielas.
                            
                            Las quinielas que se queden con datos vacíos en resultados, goles o equipos clasificados no generarán puntos para el participante y quedarán inactivas.
        
                            Aquellos participantes que no hayan pagado el importe de la inscripción por cada quiniela registrada, no estarán activados en el momento del inicio de la quiniela y no podrán participar en la misma.
        
                            La Quinielas World Cup 2022 comenzará con el primer partido de la FIFA World Cup 2022 y concluirá con el partido final. Luego de esto, se declararán los ganadores de la quiniela y se entregará el premio respectivo en base a la tabla de posiciones final y reglas aquí mostradas para la Quinielas World Cup 2022.    
                            </p>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default Rules;