import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { TarefaService } from '../services/tarefa.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Router } from '@angular/router';
import { CadastroUsuarioService } from '../services/cadastro-usuario.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: 'green',
    secondary: 'green',
  },
};

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  listaTarefas: any = [];
  objectTarefa: any = null;
  modo = "calendar";
  listaUsuario:any []; 
  usuarioFiltro:any;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;
  constructor(private tarefaService: TarefaService, private modal: NgbModal,
    private router:Router, private usuarioService:CadastroUsuarioService) {
    this.buscarTarefas();
    this.buildObjectTarefa();
    this.buscarUsuarios();
  }

  ngOnInit(): void {
  }

  trocarModo() {
    if (this.modo == 'calendar') {
      this.modo = "cadastro";
    } else {
      this.modo = "calendar";
    }
  }

  irParaUsuarios(){
    this.router.navigate(['cadastro-usuario']);
  }


  buscarTarefaPorUsuario() {
    alert(this.usuarioFiltro)
    this.tarefaService.buscarPorIdUser(this.usuarioFiltro).subscribe((retorno: any) => {
      this.listaTarefas = retorno;
      this.convertToCalendar();
    });
  }

  buscarTarefas(){
    this.tarefaService.buscarTodos().subscribe((retorno: any) => {
      this.listaTarefas = retorno;
      this.convertToCalendar();
    });
  }

  buscarUsuarios(){
    this.usuarioService.buscarTodos().subscribe((retorno: any) => {
      this.listaUsuario = retorno;
    });
  }


  adicionarNovo() {
    this.buildObjectTarefa();
  }

  remover() {
    this.buildObjectTarefa();
  }

  validarDados() {
    let resultado = this.tarefaService.validarDados(this.objectTarefa);
    if (resultado == "ok") {
      this.salvar();
    } else {
      alert(resultado)
    }
  }

  stringToDate(v): Date {
    return new Date(v.split("-")[0], v.split("-")[1], v.split("-")[2])
  }

  salvar() {
    this.objectTarefa.dataFim = this.stringToDate(this.objectTarefa.dataFim).getTime();
    this.objectTarefa.dataInicio = this.stringToDate(this.objectTarefa.dataInicio).getTime();
    this.objectTarefa.dataPrevistaFim = this.stringToDate(this.objectTarefa.dataPrevistaFim).getTime();
    this.tarefaService.salvar(this.objectTarefa).subscribe((retorno: any) => {
      this.buscarTarefaPorUsuario();
      alert("Salvo com Sucesso!")
    }, error => {
      alert(JSON.stringify(error.error))
    });
  }

  timeToStringDate(v) {
    let d = new Date(v);
    return d.getFullYear() + "-" + this.pad(d.getMonth() + 1) + "-" + d.getDate();
  }

  pad(v) {
    if (v > 9) {
      return v;
    } else {
      return "0" + v;
    }
  }

  selecionarTarefa(t) {
    this.objectTarefa = t;
    this.objectTarefa.dataFim = this.timeToStringDate(this.objectTarefa.dataFim);
    this.objectTarefa.dataInicio = this.timeToStringDate(this.objectTarefa.dataInicio);
    this.objectTarefa.dataPrevistaFim = this.timeToStringDate(this.objectTarefa.dataPrevistaFim);
  }

  
  convertToCalendar(){
      let t = null;
      for (let tarefa of this.listaTarefas){
        this.addEventObject(tarefa);
      }
    
  }

  buildObjectTarefa() {
    let t = {
      titulo: "",
      dataInicio: null,
      dataFim: null,
      dataPrevistaFim: null,
      importancia: null,
      idTarefa: null,
      usuario: 1
    }
    this.objectTarefa = t;
  }

  transformarData(valor) {
    return new Date(valor);
  }


  //inicio metodos calendar
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEventObject(obj): void {
    this.events = [
      ...this.events,
      {
        title: obj.titulo,
        start: startOfDay(new Date(obj.dataInicio)),
        end: endOfDay(new Date(obj.dataFim)),
        color: obj.importancia == 1 ? colors.red : obj.importancia == 2 ? colors.blue : colors.yellow,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
