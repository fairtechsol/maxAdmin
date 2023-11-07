import { Accordion } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Sidebar = (props: any) => {
  return (
    <>
      <div className="sidebarBox bg-light">
        <div className="sidebarBox-close" onClick={props.sidebarCloseBtn}>
          <GiHamburgerMenu />
        </div>
        <Accordion defaultActiveKey={["0"]}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="bg-transparent">
              Football
            </Accordion.Header>
            <Accordion.Body>
              {/* sub menu */}
              <Accordion defaultActiveKey={["0"]}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>ARGENTINA Reserve League</Accordion.Header>
                  <Accordion.Body>
                    {/* sub menu */}
                    <Accordion defaultActiveKey={["0"]}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>2023/11/07</Accordion.Header>
                        <Accordion.Body>
                          {/* sub menu link start*/}
                          <Accordion defaultActiveKey={["0"]}>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Huracan Res. - Atletico Tucuman Res.
                              </Accordion.Header>
                              <Accordion.Body>
                                <Link to="1st Period Winner">
                                  1st Period Winner
                                </Link>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                          {/* sub menu link end*/}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {/* sub menu */}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tenies</Accordion.Header>
            <Accordion.Body>ARGENTINA Reserve League</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Cricket</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur2222
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <ul className='h-100 '>
          
            <li className='border-0'>
            <Link to='/'>dsdsad</Link>
            </li>
            <li className='border-0'>Tenies</li>
            <li className='border-0'>Cricket</li>
            <li className='border-0'>Ice Hockey</li>
            <li className='border-0'>Volleyball</li>
            <li className='border-0'>Basketball</li>
            <li className='border-0'>Kabaddi</li>
            <li className='border-0'>Boxing</li>
            <li className='border-0'>Tabel Tennise</li>
            <li className='border-0'>Drafts</li> 
        </ul> */}
      </div>
    </>
  );
};

export default Sidebar;
