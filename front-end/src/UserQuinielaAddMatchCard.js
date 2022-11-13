import React from "react";
import { Card, Image, Col, Row, Form } from 'react-bootstrap';

function UserQuinielaAddMatchCard({ match, formik, classifiedTeams = null }){
    let teamAName;
    let teamALogo = "";
    let teamBName;
    let teamBLogo = "";
    if(match.id <= 48){
        teamAName = match.teamA.name;
        teamALogo = <Image src={ `/images/team_logo/${match.teamA.shortName}.png` } alt={ match.teamA.name } fluid={true} />;
        teamBName = match.teamB.name;
        teamBLogo = <Image src={ `/images/team_logo/${match.teamB.shortName}.png` } alt={ match.teamB.name } fluid={true} />;
    }else{
        const teamA_classified = classifiedTeams[match.teamA_classified];
        const teamB_classified = classifiedTeams[match.teamB_classified];
        
        teamAName = teamA_classified.teamName;
        teamALogo = <Image src={ `/images/team_logo/${teamA_classified.teamShortName}.png` } alt={ teamA_classified.teamName } fluid={true} />;
        teamBName = teamB_classified.teamName;
        teamBLogo = <Image src={ `/images/team_logo/${teamB_classified.teamShortName}.png` } alt={ teamB_classified.teamName } fluid={true} />;
    }
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>Match { match.id }</Col>
                </Row>
                
                { match.group ? 
                <Row>
                    <Col>Group { match.group }</Col>
                </Row>: null }
                
                <Row>
                    <Col md={3}>
                        { teamALogo }
                        { teamAName }
                    </Col>
                    <Col md={2}>
                        <Form.Control name={ `match_${match.id}_team_a` } type="text" 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values[`match_${match.id}_team_a`]}
                            isInvalid={formik.touched[`match_${match.id}_team_a`] && formik.errors[`match_${match.id}_team_a`]}
                        />
                        {formik.touched[`match_${match.id}_team_a`] && formik.errors[`match_${match.id}_team_a`] ? (<div>{formik.errors[`match_${match.id}_team_a`]}</div>) : null}
                    </Col>
                    <Col md={2}>vs</Col>
                    <Col md={2}>
                        <Form.Control name={ `match_${match.id}_team_b` } type="text" 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values[`match_${match.id}_team_b`]}
                            isInvalid={formik.touched[`match_${match.id}_team_b`] && formik.errors[`match_${match.id}_team_b`]}
                        />
                        {formik.touched[`match_${match.id}_team_b`] && formik.errors[`match_${match.id}_team_b`] ? (<div>{formik.errors[`match_${match.id}_team_b`]}</div>) : null}
                    </Col>
                    <Col md={3}>
                        { teamBName }
                        { teamBLogo }
                    </Col>
                </Row>
                <Row>
                    <Col>{ match.date } - { match.time }</Col>
                </Row>
                <Row>
                    <Col>{ match.city } - { match.stadium }</Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default UserQuinielaAddMatchCard;