"use client";

import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {useDisclosure} from "@nextui-org/use-disclosure";

export default function TermOfUse() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  return (
      <>
        <Button size='md' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onOpen} style={{ background: 'none', fontSize: '16px', textDecoration: isHovered ? 'underline' : 'none'}}>이용약관</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"> 이용약관 (2023.12.19)</ModalHeader>
                  <ModalBody className="overflow-y-auto max-h-[50vh]">
                    <p>
                      제 1조 총칙 (목적)
                    </p>
                    <p>
                    본 약관은 회사가 제공하는 플랫폼 관련 온라인 교육 서비스(이하 &quot;서비스&quot;)를 이용함에 있어 회사와 회원과의 권리, 의무, 이용조건 및 절차에 관한 사항과 기타 이용에 필요한 사항 등을 규정함을 목적으로 합니다.
                    </p>
                    <p>
                    제2조 (약관의 효력 및 변경)
                    </p>
                    <p>
                    제2조 (약관의 효력 및 변경)<br/>
                    ① 본 약관은 서비스를 이용하는 회원에 대하여 그 효력을 발생합니다.<br/>
                    ② 본 약관의 내용은 플랫폼 서비스 사이트에 게시하거나 기타의 방법으로 회원에게 공지하고, 이에 동의한 회원이 서비스에 가입함으로써 효력이 발생합니다.<br/>
                    ③ 회사는 본 약관의 내용과 회사의 상호, 영업소 소재지, 대표자 성명, 사업자 등록번호, 연락처(전화, 전자우편 주소 등) 등을 회원이 알 수 있도록 사이트의 초기 서비스 화면에 게시합니다.<br/>
                    ④ 본 약관은 회사가 필요하다고 인정되는 경우 대한민국 법령의 범위 내에서 개정할 수 있으며, 회사가 본 약관을 개정할 경우에는 적용예정일 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기화면에 그 적용예정일 7일 전부터 공지합니다. 
                    다만, 회원에게 불리하게 약관내용을 변경하는 경우에는 그 적용예정일 30일 전부터 공지하며, 공지하는 것 외에 전자우편 발송 등 전자적 수단을 통해 별도로 통지합니다.<br/>
                    ⑤ 회원은 개정된 약관에 대해 동의하지 않을 권리가 있으며, 개정된 약관에 동의하지 않을 경우 이용계약을 해지할 수 있습니다. 단, 회사가 제4항에 따라 변경 약관을 공지 또는 통지하면서, 
                    회원이 개정된 약관의 적용일 전까지 거부의사를 표시하지 아니하는 경우 약관의 변경에 동의한 것으로 간주한다는 내용을 공지 또는 통지하였음에도 회원이 명시적으로 거부의사를 표시하지 아니하였다면 회원이 변경 약관에 동의한 것으로 간주합니다. 
                    회원은 변경된 약관에 동의 하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.<br/>
                    ⑥ 본 약관에 동의하는 것은 회사가 운영하는 서비스 사이트를 정기적으로 방문하여 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 
                    변경된 약관에 대한 정보를 알지 못하여 발생하는 회원의 피해에 대해 회사는 책임을 지지 않습니다.<br/>
                    </p>
                    <p>
                    제3조 (약관의 해석 및 약관 외 준칙)
                    </p>
                    <p>
                    ① &quot;회사&quot;는 개별 서비스에 대해서 별도의 이용약관 및 운영정책을 둘 수 있으며, 해당 내용이 본 약관과 상충할 경우에는 개별 서비스 별 이용약관(이하 &quot;개별 약관&quot;) 또는 운영정책을 우선하여 적용합니다.<br/>
                    ② 회사는 개별 약관 등을 제2조 제3항의 방법에 의하여 공지할 수 있으며, 회원은 운영정책을 숙지하고 준수하여야 합니다.<br/>
                    ③ 본 약관에 명시되지 사항은 개별 약관 또는 운영정책, 관련 법령, 상관례에 따릅니다.<br/>
                    </p>
                    <p>
                    제5조 (이용계약의 성립, 이용신청 및 승낙)
                    </p>
                    <p>
                    ① 이용계약은 회원이 되고자 하는 자가 약관의 내용에 대하여 동의를 한 다음 회원가입 신청을 하고 회사가 이러한 신청에 대하여
                    승낙함으로써 체결됩니다.<br/>
                    ② 회원이 되고자 하는 자는 사이트에 가입 시(또는 교육등록 신청 시) 회사에서 제공하는 회원가입(또는 교육등록) 
                    신청양식에 따라 필요사항(성명, 전자우편 주소, 핸드폰 번호, 아이디 등)을 기재하여야 합니다.<br/>
                    ③ 회사는 회원이 되고자 하는 자에게 전자우편 주소와 핸드폰 번호를 통한 인증 및 기타 본인을 확인할 수 있는
                    인증절차를 요구할 수 있습니다. 이 경우 회원이 되고 자 하는 자는 해당 인증을 수행하는 등 가입절차를 완료하여야 합니다.<br/>
                    </p>
                    <p>
                    제6조 (이용신청에 대한 승낙의 제한)
                    </p>
                    <p>
                    ① 회사는 다음의 각 호에 해당하는 이용신청에 대하여는 승낙을 제한할 수 있으며,
                    이 사유가 해소될 때까지 승낙을 유보하거나 승낙한 이후에도 이용계약을 해지할 수 있습니다.<br/>
                    기술상 문제가 있거나 서비스 관련 설비 용량이 부족한 경우<br/>
                    가입신청자가 본 약관에 따라 이전에 회원자격을 상실한 적이 있는 경우. 단, 회사의 재가입 승낙을 얻을 경우는 예외로 함<br/>
                    실명이 아니거나 다른 사람의 명의사용 등 회원 등록 시 허위로 신청하는 경우<br/>
                    회원 등록사항을 누락하거나 오기하여 신청하는 경우<br/>
                    서비스 이용목적 또는 이용행위가 법령에 위반되거나 제3자의 권리를 침해할 우려가 있는 경우<br/>
                    악성 프로그램 및 버그를 이용하거나 시스템 취약점을 악용하는 등 부정한 방법을 서비스에 사용한 경우<br/>
                    회사의 사전 동의 없이 영리를 추구할 목적으로 서비스를 이용하고자 하는 경우<br/>
                    사회의 안녕질서 또는 미풍양속을 저해하거나 저해할 목적으로 신청한 경우<br/>
                    가입신청자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하여 신청하는 경우<br/>
                    기타 회사가 정한 이용신청 요건이 만족되지 않았을 경우<br/>
                    ② 이용신청의 승낙을 하지 아니하거나 유보한 경우 회사는 원칙적으로 이를 가입신청자에게 알리도록 합니다.<br/>
                    ③ 회사는 회원에 대하여 회사 정책에 따라 회원 유형별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.<br/>
                    </p>
                    <p>
                    제7조 (회원정보 변경 및 보호)
                    </p>
                    <p>
                    ① 회원은 회원정보 관리화면을 통하여 언제든지 본인의 정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 아이디는 수정이 불가능하며,
                    부득이한 사유로 수정하고자 하는 경우 이용계약을 해지하고 사이트에 재가입 하여야 합니다.<br/>
                    ② 회원은 이용 신청 시 기재한 사항이 변경되었을 경우 즉시 온라인으로 수정을 하거나 회사가 정한 별도의 양식 및 방법으로 변경 사항을 알려야 합니다.<br/>
                    ③ 회사는 회원이 변경사항을 알리지 않아 발생한 불이익에 대하여 책임지지 않습니다.<br/>
                    ④ 회사는 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 &quot;정보통신망법&quot;) 등 관계법령이 정하는 바에 따라 회원의 정보를 보호하기 위해 노력합니다.<br/>
                    ⑤ 개인정보의 보호 및 이용에 대해서는 관계법령 및 회사의 개인정보 처리방침이 적용됩니다. 다만, 회사의 사이트 이외의 링크된 사이트에서는 회사의 개인정보 처리방침이 적용되지 않습니다.<br/>
                    </p>
                    <p>
                    제 14 조 (게시물의 저작권)
                    </p>
                    <p>
                    ① 회사가 작성하여 사이트 또는 서비스에 게시한 저작물의 저작권은 회사 또는 회사가 제휴계약을 맺은 제3자에 귀속됩니다. 단, 회원이 게시한 저작물은 제외합니다.<br/>
                    ② 회원이 서비스 내에 게시한 게시물(회원간 전달 포함, 이하 같다.)에 대한 모든 권한과 책임은 회원 자신에게 있습니다. 회사와 다른 회원들은 회원이 게시한 게시물을 서비스 목적 범위 내에서 이용할 수 있으나 회원의 동의 없이 서비스 외 다른 목적으로 사용할 수 없습니다.<br/>
                    ③ 회원은 개별약관 등 및 관련 법령의 규정에서 별도로 정하지 않는 한 회원이 서비스에 게시물을 게시하거나 게시를 위해 회사에 제공함과 동시에 회사에게 서비스 제공을 위한 범위 내의 비독점적인 사용권을 부여한 것으로 간주 합니다.<br/>
                    ④ 회사는 회원이 서비스 내에 게시한 게시물이 타인의 저작권, 프로그램 저작권 등 지식재산권을 침해하더라도 이에 대한 민•형사상 등 일체의 책임을 부담하지 않습니다. 만일 회원이 타인의 지식재산권을 침해하였음을 이유로 회사가 
                    타인으로부터 손해배상청구 등 이의 제기를 받은 경우 회원은 회사의 면책을 위하여 노력하여야 하며, 회사가 면책되지 못한 경우 회원은 그로 인해 회사에 발생한 모든 손해를 배상하여야 합니다.<br/>
                    ⑤ 회사는 회원이 해지하거나 적법한 사유로 해지된 경우 해당 회원이 게시하였던 게시물을 삭제할 수 있습니다.<br/>
                    ⑥ 회원은 서비스에 게시된 자료 또는 서비스를 이용하여 얻은 정보를 회사 또는 이를 게시한 회원의 사전승낙 없이 영리 목적으로 이용 또는 복제, 송신, 출판, 배포, 방송하거나 제3자에게 이를 이용하게 할 수 없으며, 이를 위반할 경우 지식재산권 침해에 대한 책임을 부담할 수 있습니다.<br/>
                    ⑦ 서비스, 서비스와 관련된 소프트웨어와 후원 광고에 포함되어 있는 내용 및 서비스 또는 광고주를 통하여 회원에게 제공 되는 정보는 저작권, 상표권, 특허 등 제반 지식재산권 관련 법령에 의해 보호됩니다.<br/>
                    </p>
                    <p>
                    제 15 조 (서비스의 재판매 금지)
                    </p>
                    <p>
                    회원은 상업적인 목적을 위하여 서비스 자체, 서비스 이용 또는 서비스 내용의 일부 또는 전부를 복사, 복제, 판매, 재판매 또는 이용할 수 없습니다.
                    </p>
                    <p>
                    제 16 조 (영상서비스 이용관련)
                    </p>
                    <p>
                    ① 회사는 이용자에게 안정적인 서비스를 제공하기 위해, 회사의 서비스 정책과 기술환경에 의하여 필요하다고 판단될 경우 플러그인 프로그램이나 기술을 변경할 수 있습니다.<br/>
                    ② 제공되는 영상서비스 중 일부 서비스는 회사에서 정한 회원정책상의 회원자격과 회원이 사용하고 있는 해당 유무선 기기의 종류와 사양에 따라 사용의 제한이 있을 수 있으며, 해당사항에 대한 안내는 해당 서비스의 사용안내 또는 공지를 통하여 통지합니다.<br/>
                    ③ 서비스에서 제공하는 영상 콘텐츠에 대해 정당한 권한이나 해당 프로그램 저작권자의 허락 없이 프로그램 등을 변경, 복제, 제거하거나 배포, 게시, 전송, 링크하는 경우나 저작권자의 실명 또는 익명을 변경 또는 은닉하거나 해당 프로그램의 제호를 변경하여 당사자의 허락 없이 게시, 게재할 수 없습니다.<br/>
                    ④ 회원은 게재한 소프트웨어 프로그램, 정보, 메시지, 데이터, 문서, 그림, 이미지, 문자, 사운드 등의 정보에 대하여 책임이 있으며, 저작권 침해나 기타의 불법으로 인해 발생하는 모든 피해에 대한 책임은 본인에게 있습니다.<br/>
                    ⑤ 본 조 제3항 및 제4항으로 인해 피해가 발생하는 경우 회사는 어떠한 책임도 부담하지 아니합니다.<br/>
                    </p>
                    <p>
                    제21조 (회사의 의무)
                    </p>
                    <p>
                    ① 회사는 서비스 제공과 관련하여 알고 있는 회원의 개인정보를 본인의 동의 없이 제3자에게 누설, 배포, 제공하지 않습니다. <br/>
                    단, 관계법령에 의한 수사상의 목적으로 관계기관으로부터 요구 받은 경우 등 법률의 규정에 따른 적법한 절차에 의한 경우에는 그러하지 않습니다.<br/>
                    ② 회사는 관계법령과 본 약관에서 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.<br/>
                    ③ 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보 보호를 위한 보안시스템을 갖추어야 하며, 개인정보처리방침을 공시하고 준수합니다.<br/>
                    회사는 서비스 이용과 관련하여 발생하는 회원의 불만 또는 피해구제 요청을 적절하게 처리할 수 있도록 필요한 인력 및 시스템을 구비하고, 
                    서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하고, 처리결과를 통지합니다.<br/>
                    ④ 회사는 정보통신망법, 통신비밀보호법, 전기통신사업법 등 서비스의 운영, 유지와 관련 있는 법규를 준수합니다.<br/>
                    </p>
                    <p>
                    제22조 (회원의 의무)
                    </p>
                    <p>
                    ① 회원은 관계법령, 본 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안됩니다.<br/>
                    ② 회원은 회사의 사전 동의 없이 서비스를 이용하여 어떠한 영리행위도 할 수 없으며, 법에 저촉되는 자료를 배포 또는 게재할 수 없습니다.<br/>
                    ③ 회원은 유료서비스를 이용할 경우 적법한 방법에 의하여 이용요금을 결제하여야 하며, 이용요금은 성실히 납부되어야 합니다.<br/>
                    ④ 회원은 회사가 서비스 이용과 관련하여 필요한 사항을 회원에게 알릴 수 있도록 회원가입 시 연락 가능한 전자우편 주소를 제공하여야 하고, 회원의 정보가 변경된 경우에는 이를 회사에 즉시 알려야 하며,
                    회원이 변경 정보를 회사에 알리지 않아 발생하는 불이익에 대해 회사는 책임을 지지 않습니다.<br/>
                    ⑤ 회원은 본 약관에서 규정하는 사항, 서비스 초기화면 또는 공지사항 및 회사가 정한 운영정책 등 제반 정책이나 규정을 수시로 확인하여야 합니다.<br/>
                    </p>
                    <p>
                    제23조 (아이디와 비밀번호 등의 관리에 대한 의무와 책임)
                    </p>
                    <p>
                    ① 회원은 자신의 아이디와 비밀번호가 제3자에게 노출 또는 이용되지 않도록 철저히 관리하여야 합니다.<br/>
                    ② 회원이 전 항의 의무를 위반하여 발생하는 서비스 이용상의 손해 또는 제3자에 의한 부정사용 등에 의하여 발생하는 모든 결과 에 대한 책임은 회원에게 있으며, 회사는 그에 대한 책임을 지지 않습니다.<br/>
                    ③ 회사는 회원의 아이디로 인하여 개인정보 유출 우려가 있거나 반사회적 또는 미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인 우려가 있는 경우 해당 아이디의 이용을 제한할 수 있습니다.<br/>
                    ④ 회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.<br/>
                    ⑤ 전 항의 경우에 회원이 회사에 그 사실을 통지하지 않거나 통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다.<br/>
                    </p>
                    <p>
                    제 25조 (개인정보의 보호 및 위탁)
                    </p>
                    <p>
                    ① 회사는 개인정보 보호법 등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위하여 노력합니다. 회원의 개인정보 보호 및 사용에 대해서는 관계 법령 및 회사의 개인정보 처리방침이 적용됩니다.<br/>
                    ② 회사는 수집된 개인정보의 처리 및 관리 등의 업무를 스스로 수행함을 원칙으로 하나, 필요한 경우 업무의 일부 또는 전부를 회사가 선정한 제3자에 위탁할 수 있습니다. 회원의 개인정보 위탁에 대해서는 회사의 개인정보 처리방침이 적용됩니다.<br/>
                    </p>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onPress={onClose}>
                      확인
                    </Button>
                  </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  );
}
